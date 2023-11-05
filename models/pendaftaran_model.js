const sql = require("./db.js");

const Pendaftaran = function (pendaftaran) {
  this.id_murid = pendaftaran.id_murid;
  this.id_kelas = pendaftaran.id_kelas;
  this.id_admin = pendaftaran.id_admin;
  this.tanggal_pendaftaran = pendaftaran.tanggal_pendaftaran;
  this.status_pendaftaran = pendaftaran.status_pendaftaran;
};

const PendaftaranAll = function (pendaftaran) {
  this.id_murid = pendaftaran.id_murid;
  this.nama_muridd = pendaftaran.nama_murid;
  this.id_kelas = pendaftaran.id_kelas;
  this.nama_kelas = pendaftaran.nama_kelas;
  this.id_admin = pendaftaran.id_admin;
  this.nama_admin = pendaftaran.nama_admin;
  this.tanggal_pendaftaran = pendaftaran.tanggal_pendaftaran;
  this.status_pendaftaran = pendaftaran.status_pendaftaran;
};

Pendaftaran.create = (pendaftaran, result) => {
  let query = "INSERT INTO pendaftaran SET ?";

  sql.query(query, pendaftaran, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created pendaftaran: ", { ...pendaftaran });
    result(null, { ...pendaftaran });
  });
};

PendaftaranAll.getAll = (result) => {
  let query =
    "SELECT p.id_pendaftaran, p.id_murid, m.nama AS nama_murid, p.id_admin, a.nama AS nama_admin, p.id_kelas, k.nama_kelas AS nama_kelas, p.tanggal_pendaftaran, p.status_pendaftaran FROM pendaftaran p INNER JOIN murid m ON p.id_murid = m.id_murid INNER JOIN admin a ON p.id_admin = a.id_admin INNER JOIN kelas k ON p.id_kelas = k.id_kelas ORDER BY p.id_pendaftaran";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("pendaftaran: ", res);
    result(null, res);
  });
};

Pendaftaran.deleteById = (id, result) => {
  sql.query(
    "DELETE FROM pendaftaran WHERE id_pendaftaran = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(res.affectedRows);
      result(null, res);
    }
  );
};

Pendaftaran.updateById = (id, pendaftaran, result) => {
  let query =
    "UPDATE pendaftaran SET id_murid = ?, id_kelas = ?, id_admin = ?, tanggal_pendaftaran = ?, status_pendaftaran = ? WHERE id_pendaftaran = ?";

  sql.query(
    query,
    [
      pendaftaran.id_murid,
      pendaftaran.id_kelas,
      pendaftaran.id_admin,
      pendaftaran.tanggal_pendaftaran,
      pendaftaran.status_pendaftaran,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(res.affectedRows);
      result(null, { ...pendaftaran });
    }
  );
};

module.exports = {
  Pendaftaran,
  PendaftaranAll,
};
