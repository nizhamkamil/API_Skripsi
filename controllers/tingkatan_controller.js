const Tingkatan = require("../models/tingkatan_model");

exports.create = (req,res) => {
    const tingkatan = new Tingkatan({
        nama_tingkatan: req.body.nama_tingkatan,
        deskripsi_tingkatan: req.body.deskripsi_tingkatan
    })

    Tingkatan.create(tingkatan,(err,data) => {
        res.send(data);
    })
}

exports.getAll = (req,res) => {
    Tingkatan.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tingkatan."
            })
        }else{
            res.send(data);
        }
    })
}

exports.deleteById = (req,res) => {    
    Tingkatan.deleteById(req.params.id,(err,data) => {
        //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES 
        console.log(req.params.id + 'ini IDNYA')
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while deleting the tingkatan."
            })
        }else{
            res.send({
                message: "Tingkatan deleted successfully."
            })
        }
    })
}

exports.updateById = (req,res) => {
    const id = req.params.id;

    const tingkatan = new Tingkatan({
        nama_tingkatan: req.body.nama_tingkatan,
        deskripsi_tingkatan: req.body.deskripsi_tingkatan
    })

    Tingkatan.updateById(id,tingkatan,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while updating tingkatan with id = " + id
            })
        }else{
            res.send(data);
        }
    });
}