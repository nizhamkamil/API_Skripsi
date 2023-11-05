const {
  Pendaftaran,
  PendaftaranAll,
} = require("../models/pendaftaran_model.js");

exports.create = (req, res) => {
  const pendaftaran = new Pendaftaran({
    id_murid: req.body.id_murid,
    id_kelas: req.body.id_kelas,
    id_admin: req.body.id_admin,
    tanggal_pendaftaran: req.body.tanggal_pendaftaran,
    status_pendaftaran: req.body.status_pendaftaran,
  });

  Pendaftaran.create(pendaftaran, (err, data) => {
    res.send(data);
  });
};

exports.getAll = (req, res) => {
  PendaftaranAll.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving pendaftaran.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.deleteById = (req, res) => {
  Pendaftaran.deleteById(req.params.id, (err, data) => {
    //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES
    console.log(req.params.id + "ini IDNYA");
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleting the pendaftaran.",
      });
    } else {
      res.send({
        message: "Pendaftaran deleted successfully.",
      });
    }
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;

  const pendaftaran = new Pendaftaran({
    id_murid: req.body.id_murid,
    id_kelas: req.body.id_kelas,
    id_admin: req.body.id_admin,
    tanggal_pendaftaran: req.body.tanggal_pendaftaran,
    status_pendaftaran: req.body.status_pendaftaran,
  });

  Pendaftaran.updateById(id, pendaftaran, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while updating pendaftaran with id = " + id,
      });
    } else {
      res.send(data);
    }
  });
};
