const Admin = require("../models/admin_model");

exports.login = (req,res) => {
    Admin.login(req.body.username,req.body.password,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving admin."
            })
        }else{
            res.send(data);
        }
    })
}