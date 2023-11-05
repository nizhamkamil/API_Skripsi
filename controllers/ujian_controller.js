const { Ujian, UjianAll } = require("../models/ujian_model.js");

exports.create = (req, res) => {
  const ujian = new Ujian({
    id_murid: req.body.id_murid,
    id_guru: req.body.id_guru,
    status_ujian: req.body.status_ujian,
    hasil_ujian: req.body.hasil_ujian,
  });

  Ujian.create(ujian, (err, data) => {
    res.send(data);
  });
};

exports.getAll = (req, res) => {
  UjianAll.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving ujian.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getByIdMurid = (req, res) => {
  Ujian.getByIdMurid(req.params.id, (err, data) => {
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving ujian.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getByIdGuru = (req, res) => {
  Ujian.getByIdGuru(req.params.id, (err, data) => {
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving ujian.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.deleteById = (req, res) => {
  Ujian.deleteById(req.params.id, (err, data) => {
    //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while deleting the ujian.",
      });
    } else {
      res.send({
        message: "Ujian deleted successfully.",
      });
    }
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;

  const ujian = new Ujian({
    id_murid: req.body.id_murid,
    id_guru: req.body.id_guru,
    status_ujian: req.body.status_ujian,
    hasil_ujian: req.body.hasil_ujian,
  });

  Ujian.updateById(id, ujian, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while updating ujian with id = " + id,
      });
    } else {
      res.send(data);
    }
  });
};
