const KelasFoto = require("../models/kelas_foto_model.js");

exports.create = (req, res) => {
  const kelasfoto = new KelasFoto({
    nama_foto: req.body.nama_foto,
    path_foto: req.body.path_foto,
    id_kelas: req.body.id_kelas,
  });

  KelasFoto.create(kelasfoto, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the kelasfoto.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getByKelas = (req, res) => {
  KelasFoto.getByKelas(req.params.id, (err, data) => {
    // NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving kelasfoto.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.upload = (req, res) => {
  const filenames = req.files.map((file) => file.filename);
  res.json({
    message: filenames,
  });
};
exports.getAll = (req, res) => {
  KelasFoto.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving kelasfoto.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getById = (req, res) => {
  KelasFoto.getById(req.params.id, (err, data) => {
    // NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving kelasfoto.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.deleteById = (req, res) => {
  KelasFoto.deleteById(req.params.id, async (err, data) => {
    // NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleting the kelasfoto.",
      });
    } else {
      res.send({
        message: "Kelasfoto deleted successfully.",
      });
    }
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;

  const kelasfoto = new KelasFoto({
    nama_foto: req.body.nama_foto,
    path_foto: req.body.path_foto,
    id_kelas: req.body.id_kelas,
  });

  KelasFoto.updateById(id, kelasfoto, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while updating kelasfoto with id = " + id,
      });
    } else {
      res.send(data);
    }
  });
};
