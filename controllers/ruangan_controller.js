const Ruangan = require("../models/ruangan_model.js");

exports.create = (req,res) => {
    const ruangan = new Ruangan({
        nama_ruangan: req.body.nama_ruangan,
        deskripsi_ruangan: req.body.deskripsi_ruangan
    })

    Ruangan.create(ruangan,(err,data) => {
        res.send(data);
    })
}

exports.getAll = (req,res) => {
    Ruangan.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving ruangan."
            })
        }else{
            res.send(data);
        }
    })
}

exports.deleteById = (req,res) => {
    Ruangan.deleteById(req.params.id,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while deleting ruangan."
            })
        }else{
            res.send({
                message: "Ruangan deleted successfully."
            })
        }
    })
}

exports.updateById = (req,res) => {
    const id = req.params.id;

    const ruangan = new Ruangan({
        nama_ruangan: req.body.nama_ruangan,
        deskripsi_ruangan: req.body.deskripsi_ruangan
    })

    Ruangan.updateById(id,ruangan,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while updating ruangan with id = " + id
            })
        }else{
            res.send(data);
        }
    })
}