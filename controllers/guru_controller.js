const Guru = require("../models/guru_model.js");

exports.create = (req, res) => {
  const guru = new Guru({
    nama: req.body.nama,
    username: req.body.username,
    password: req.body.password,
    alamat: req.body.alamat,
    email: req.body.email,
    no_telepon: req.body.no_telepon,
    agama: req.body.agama,
    kewarganegaraan: req.body.kewarganegaraan,
    jenis_kelamin: req.body.jenis_kelamin,
    status_nikah: req.body.status_nikah,
  });

  Guru.create(guru, (err, data) => {
    res.send(data);
  });
};

exports.getAll = (req, res) => {
  Guru.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving guru.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.login = (req, res) => {
  Guru.login(req.body.username, req.body.password, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving guru.",
      });
    } else {
      if (data == "FAILED") {
        res.send("FAILED");
        return;
      }
      res.send([data]);
    }
  });
};

exports.deleteById = (req, res) => {
  Guru.deleteById(req.params.id, (err, data) => {
    //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while deleting the guru.",
      });
    } else {
      res.send({
        message: "Guru deleted successfully.",
      });
    }
  });
};
exports.updateById = (req, res) => {
  const id = req.params.id;

  const guru = new Guru({
    nama: req.body.nama,
    username: req.body.username,
    password: req.body.password,
    alamat: req.body.alamat,
    email: req.body.email,
    no_telepon: req.body.no_telepon,
    agama: req.body.agama,
    kewarganegaraan: req.body.kewarganegaraan,
    jenis_kelamin: req.body.jenis_kelamin,
    status_nikah: req.body.status_nikah,
  });

  Guru.updateById(id, guru, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while updating guru with id = " + id,
      });
    } else {
      res.send(data);
    }
  });
};
