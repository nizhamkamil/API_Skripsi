const Jadwal = require("../models/jadwal_pembelajaran_model.js");

exports.create = (req,res) => {
    const jadwal = new Jadwal({
        id_ruangan: req.body.id_ruangan,
        id_kelas: req.body.id_kelas,
        id_tingkatan: req.body.id_tingkatan,
        id_guru: req.body.id_guru,
        id_murid: req.body.id_murid,
        jam_mulai: req.body.jam_mulai,
        jam_selesai: req.body.jam_selesai,
        hari: req.body.hari
    
    })

    Jadwal.create(jadwal,(err,data) => {
        res.send(data);
    })
}

exports.getAll = (req,res) => {
    Jadwal.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving jadwal."
            })
        }else{
            res.send(data);
        }
    })
}

exports.getByIdGuru = (req,res) => {
    Jadwal.getByIdGuru(req.params.id,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving jadwal."
            })
        }else{
            res.send(data);
        }
    })
}

exports.getByIdMurid = (req,res) => {
    Jadwal.getByIdMurid(req.params.id,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving jadwal."
            })
        }else{
            res.send(data);
        }
    })
}

exports.deleteById = (req,res) => {
    Jadwal.deleteById(req.params.id,(err,data) => {
        //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES 
        console.log(req.params.id + 'ini IDNYA')
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while deleting the jadwal."
            })
        }else{
            res.send({
                message: "Jadwal deleted successfully."
            })
        }
    })
}

exports.updateById = (req,res) => {
    const id = req.params.id;

    const jadwal = new Jadwal({
        id_ruangan: req.body.id_ruangan,
        id_kelas: req.body.id_kelas,
        id_tingkatan: req.body.id_tingkatan,
        id_guru: req.body.id_guru,
        id_murid: req.body.id_murid,
        jam_mulai: req.body.jam_mulai,
        jam_selesai: req.body.jam_selesai,
        hari: req.body.hari
    })

   
    Jadwal.updateById(id,jadwal,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while updating the jadwal."
            })
        } else{
            res.send(data);
        }
    })
}