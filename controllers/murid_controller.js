const Murid = require("../models/murid_model.js");

exports.create = (req,res) => {
    const murid = new Murid({
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        alamat: req.body.alamat,
        email: req.body.email,
        no_telepon: req.body.no_telepon,
        jenis_kelamin: req.body.jenis_kelamin,
        tanggal_masuk: req.body.tanggal_masuk,
        agama: req.body.agama,
        kewarganegaraan: req.body.kewarganegaraan,
        status_daftar: req.body.status_daftar,
        nama_wali: req.body.nama_wali,
        tanggal_lahir: req.body.tanggal_lahir
    })

    Murid.create(murid,(err,data) => {
        res.send(data);
    })
};

exports.getAll = (req,res) => {
    Murid.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving murid."
            })
        }else{
            res.send(data);
        }
    })
}

exports.getById = (req,res) => {
    Murid.selectById(req.params.id,(err,data) => {
        console.log(req.params.id + 'ini IDNYA')
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving murid."
            })
        }else{
            res.send(data);
        }
    })
}

exports.login = (req,res) => {
    Murid.login(req.body.username,req.body.password,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving murid."
            })
        }else{
            res.send(data);
        }
    })
}

exports.deleteById = (req,res) => {
    Murid.deleteById(req.params.id,(err,data) => {
        //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES 
        console.log(req.params.id + 'ini IDNYA')
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while deleting the murid."
            })
        }else{
            res.send({
                message: "Murid deleted successfully."
            })
        }
    })
}

exports.updateById = (req,res) => {
    const id = req.params.id;

    const murid = new Murid({
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        alamat: req.body.alamat,
        email: req.body.email,
        no_telepon: req.body.no_telepon,
        jenis_kelamin: req.body.jenis_kelamin,
        tanggal_masuk: req.body.tanggal_masuk,
        agama: req.body.agama,
        kewarganegaraan: req.body.kewarganegaraan,
        status_daftar: req.body.status_daftar,
        nama_wali: req.body.nama_wali,
        tanggal_lahir: req.body.tanggal_lahir
    })

    Murid.updateById(id,murid,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while updating the murid."
            })
        }else{
            res.send(data);
        }
    })
}