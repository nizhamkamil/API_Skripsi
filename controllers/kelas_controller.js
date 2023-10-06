const Kelas = require("../models/kelas_model");

exports.create = (req,res) => {
    const kelas = new Kelas({
        nama_kelas: req.body.nama_kelas,
        deskripsi_kelas: req.body.deskripsi_kelas
    })

    Kelas.create(kelas,(err,data) => {
        res.send(data);
    })
}

exports.getAll = (req,res) => {
    Kelas.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving kelas."
            })
        }else{
            res.send(data);
        }
    })
}

exports.deleteById = (req,res) => {
    Kelas.deleteById(req.params.id,(err,data) => {
        //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES 
        console.log(req.params.id + 'ini IDNYA')
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while deleting the kelas."
            })
        }else{
            res.send({
                message: "Kelas deleted successfully."
            })
        }
    })
}

exports.updateById = (req,res) => {
    const id = req.params.id;

    const kelas = new Kelas({
        nama_kelas: req.body.nama_kelas,
        deskripsi_kelas: req.body.deskripsi_kelas
    })

    Kelas.updateById(id,kelas,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while updating kelas with id = " + id
            })
        }else{
            res.send(data);
        }
    });
}