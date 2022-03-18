const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
class UsersController {

    signup = () => {
        return async (req, res, next) => {
            if(req.body.password !== req.body.confirm_password) {
                return res.status(422).json([
                    {path: "password", message: "Passwords do not match"}, 
                    {path: "confirm_password", message: "Passwords do not match"}
                ])
            }

            try {
                const user = await User.create({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: req.body.password
                });
                res.status(200).json({
                    success: true,
                    user: user
                })
            } catch(err) {
                res.status(422).json(err.errors)
            }
        }
    }

    update = () => {
        return async (req, res, next) => {
            const resp = {success:false, user: null}
            const userId = req.params.id;
            if(userId != req.userData.id) {
                return res.status(401).json({msg: "You do not have permission to update this user."})
            }
            const user = await User.findByPk(userId)
            if(user) {
                user.fname = req.body.fname; 
                user.lname = req.body.lname;
                user.email = req.body.email;
                if(req.body.password) {
                    user.updatePassword = true;
                    user.password = req.body.password;
                }
                await user.save();
                await user.reload();
                resp.success = true;
                resp.user = user;
            }
            res.status(200).json(resp);
        }
    }

    login = () => {
        return async (req, res, next) => {
            const msg = "Something is wrong with your email or password."
            const errors = [{path:"password", message: msg}, {path: "email", message: msg}];
            const resp = {success: false, errors: errors};
            const user = await User.findOne({where:{email: req.body.email}});
            const password = req.body.password;
            if(user) {
                const passed = await bcrypt.compare(password, user.password);
                if(passed) {
                    const signVals = user.toJSON();
                    delete signVals.password;
                    const token = await jwt.sign(signVals, process.env.JWT_KEY, {
                        expiresIn: "30d"
                    });
                    resp.success = true;
                    resp.errors = [];
                    resp.token = token;
                }
            }
            res.status(200).json(resp);
        }
    }

    loggedInUser = () => {
        return async (req, res, next) => {
            const resp = {success: false, user: null, msg: "User not found"};
            const token = req.headers.authorization? req.headers.authorization.split(' ')[1]:"";
            const decoded = await jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findByPk(decoded.id);
            const data = user.toJSON();
            delete data.password;
            resp.success = true;
            resp.user = data;
            resp.msg = "User is logged in";
            res.status(200).json(resp);
        }
    }
}

module.exports = new UsersController();