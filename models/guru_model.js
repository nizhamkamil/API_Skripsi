const sql = require("./db.js");

const Guru = function (guru) {
  this.nama = guru.nama;
  this.username = guru.username;
  this.password = guru.password;
  this.alamat = guru.alamat;
  this.email = guru.email;
  this.no_telepon = guru.no_telepon;
  this.agama = guru.agama;
  this.kewarganegaraan = guru.kewarganegaraan;
  this.jenis_kelamin = guru.jenis_kelamin;
  this.status_nikah = guru.status_nikah;
};

Guru.login = (username, password, result) => {
  let query = "SELECT * FROM guru WHERE username = ? AND password = ?";
  sql.query(query, [username, password], (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found guru: ", res[0]);
      result(null, { ...res[0] });
      return;
    }
    if (!res.length) {
      console.log("found guru: ", res[0]);
      result(null, "FAILED");
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Guru.create = (newGuru, result) => {
  let query = "INSERT INTO guru SET ?";
  sql.query(query, newGuru, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created guru: ", { ...newGuru });
    result(null, { ...newGuru });
  });
};

Guru.getAll = (result) => {
  let query = "SELECT * FROM guru";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("guru: ", res);
    result(null, res);
  });
};

Guru.deleteById = (id, result) => {
  sql.query("DELETE FROM guru WHERE id_guru = ?", id, (err, res) => {
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

Guru.updateById = (id, guru, result) => {
  let query =
    "UPDATE guru SET nama = ?, username = ?, password = ?, alamat = ?, email = ?, no_telepon = ?, agama = ?, kewarganegaraan = ?, jenis_kelamin = ?, status_nikah = ? WHERE id_guru = ?";
  sql.query(
    query,
    [
      guru.nama,
      guru.username,
      guru.password,
      guru.alamat,
      guru.email,
      guru.no_telepon,
      guru.agama,
      guru.kewarganegaraan,
      guru.jenis_kelamin,
      guru.status_nikah,
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
      result(null, { ...guru });
    }
  );
};

module.exports = Guru;
