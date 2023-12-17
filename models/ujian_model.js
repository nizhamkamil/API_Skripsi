const sql = require("./db.js");

const Ujian = function (ujian) {
  this.id_murid = ujian.id_murid;
  this.id_guru = ujian.id_guru;
  this.status_ujian = ujian.status_ujian;
  this.hasil_ujian = ujian.hasil_ujian;
};

const UjianAll = function (ujian) {
  this.id_murid = ujian.id_murid;
  this.nama_murid = ujian.nama_murid;
  this.id_guru = ujian.id_guru;
  this.nama_guru = ujian.nama_guru;
  this.status_ujian = ujian.status_ujian;
  this.hasil_ujian = ujian.hasil_ujian;
};

Ujian.create = (ujian, result) => {
  let query = "INSERT INTO ujian SET ?";

  sql.query(query, ujian, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created ujian: ", { ...ujian });
    result(null, { ...ujian });
  });
};

UjianAll.getAll = (result) => {
  let query =
    "SELECT u.id_ujian, u.id_guru, g.nama AS nama_guru, u.id_murid, m.nama AS nama_murid, u.status_ujian, u.hasil_ujian FROM ujian u INNER JOIN guru g ON u.id_guru = g.id_guru INNER JOIN murid m ON u.id_murid = m.id_murid ORDER BY u.id_ujian";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("ujian: ", res);
    result(null, res);
  });
};

Ujian.getByIdMurid = (id, result) => {
  sql.query(
    "SELECT u.id_ujian, u.id_guru, g.nama AS nama_guru, u.id_murid, m.nama AS nama_murid, u.status_ujian, u.hasil_ujian FROM ujian u INNER JOIN guru g ON u.id_guru = g.id_guru INNER JOIN murid m ON u.id_murid = m.id_murid WHERE m.id_murid = ? ORDER BY u.id_ujian",
    id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found ujian: ", res[0]);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Ujian.getByIdGuru = (id, result) => {
  sql.query(
    "SELECT u.id_ujian, u.id_guru, g.nama AS nama_guru, u.id_murid, m.nama AS nama_murid, u.status_ujian, u.hasil_ujian FROM ujian u INNER JOIN guru g ON u.id_guru = g.id_guru INNER JOIN murid m ON u.id_murid = m.id_murid WHERE g.id_guru = ? ORDER BY u.id_ujian",
    id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found ujian: ", res[0]);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Ujian.deleteById = (id, result) => {
  sql.query("DELETE FROM ujian WHERE id_ujian = ?", id, (err, res) => {
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
  });
};

Ujian.updateById = (id, ujian, result) => {
  let query =
    "UPDATE ujian SET id_murid = ?, id_guru = ?, status_ujian = ?, hasil_ujian = ? WHERE id_ujian = ?";

  sql.query(
    query,
    [ujian.id_murid, ujian.id_guru, ujian.status_ujian, ujian.hasil_ujian, id],
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
      result(null, { ...ujian });
    }
  );
};

module.exports = { Ujian, UjianAll };
