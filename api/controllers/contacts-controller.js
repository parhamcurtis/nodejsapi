const Contact = require("../models/contact-model");

class ContactsController {
    getAll = () => {
        return async (req, res, next) => {
            const userId = req.userData.id;
            const {count, rows} = await Contact.findAndCountAll({
                where: {user_id: userId},
                order: [['lname', 'ASC'], ['fname', 'ASC']]
            })
            res.status(200).json({
                data: rows, 
                total: count,
                success: true
            })

        }
    }

    create = () => {
        return async (req, res, next) => {
            try {
                const userId = req.userData.id;
                const contact = await Contact.create({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phone, 
                    user_id: userId
                });
                res.status(200).json({
                    success: true, contact: contact
                })
            } catch(err) {
                res.status(422).json(err.error);
            }
        }
    }

    findById = () => {
        return async(req, res, next) => {
            const userId = req.userData.id;
            const contactId = req.params.id;
            const contact = await Contact.findOne({
                where: {id: contactId, user_id: userId}
            });
            const resp = {success: false, contact: null};
            if(contact) {
                resp.success = true;
                resp.contact = contact;
            }
            res.status(200).json(resp);
        }
    }

    update = () => {
        return async(req, res, next) => {
            try{
                const contactId = req.params.id;
                const userId = req.userData.id;
                const resp = {success:false, contact: null, msg: "Contact not found."};
                const contact = await Contact.findOne({
                    where: {id: contactId, user_id: userId}
                });
                if(contact) {
                    const vals = {fname: req.body.fname, lname: req.body.lname, email: req.body.email, phone: req.body.phone};
                    await Contact.update(vals, {where: {id:contactId}});
                    await contact.reload();
                    resp.success = true;
                    resp.msg = "Contact updated.";
                    resp.contact = contact;
                }
                res.status(200).json(resp);
            } catch(err) {
                res.status(422).json(err.error)
            }
            
        }
    }

    delete = () => {
        return async (req, res, next) => {
            const contactId = req.params.id;
            const userId = req.userData.id;
            const contact = await Contact.findOne({
                where: {id: contactId, user_id: userId}
            });
            const resp = {success: false, msg: "Contact not found"}
            if(contact) {
                await contact.destroy()
                resp.success = true;
                resp.msg = "Contact deleted"
            }
            res.status(200).json(resp);
        }
    }
}

module.exports = new ContactsController();