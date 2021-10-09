class ContactsController {
    getAll = () => {
        return (req, res, next) => {
            res.status(200).json({
                sucess: true, 
                data: [
                    {fname: "Toni", lname: "Parham", phone: "555-111-1234"},
                    {fname: "Jules", lname: "Parham", phone: "555-333-4545"}
                ]
            })
        }
    }

    create = () => {
        return (req, res, next) => {
            res.status(200).json({success:true,method:"create"});
        }
    }

    findById = () => {
        return (req, res, next) => {
            res.status(200).json({success:true,method:"findById"});
        }
    }

    update = () => {
        return (req, res, next) => {
            res.status(200).json({success:true,method:"update"});
        }
    }

    delete = () => {
        return (req, res, next) => {
            res.status(200).json({success:true,method:"delete"});
        }
    }
}

module.exports = new ContactsController();