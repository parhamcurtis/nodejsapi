const User = require("../models/user-model");
class UsersController {

    signup = () => {
        return (req, res, next) => {
            res.status(200).json({success:true, method:"signup"})
        }
    }

    update = () => {
        return (req, res, next) => {
            res.status(200).json({success:true, method:"update"})
        }
    }

    login = () => {
        return (req, res, next) => {
            res.status(200).json({success:true, method:"login"})
        }
    }

    loggedInUser = () => {
        return (req, res, next) => {
            res.status(200).json({success:true, method:"loggedInUser"})
        }
    }
}

module.exports = new UsersController();