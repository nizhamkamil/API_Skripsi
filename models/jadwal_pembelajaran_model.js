const sql = require("./db.js");

const Jadwal = function (jadwal) {
  this.id_ruangan = jadwal.id_ruangan;
  this.id_kelas = jadwal.id_kelas;
  this.nama_kelas = jadwal.nama_kelas;
  this.id_tingkatan = jadwal.id_tingkatan;
  this.nama_tingkatan = jadwal.nama_tingkatan;
  this.id_guru = jadwal.id_guru;
  this.nama_guru = jadwal.nama_guru;
  this.id_murid = jadwal.id_murid;
  this.nama_murid = jadwal.nama_murid;
  this.jam_mulai = jadwal.jam_mulai;
  this.jam_selesai = jadwal.jam_selesai;
  this.hari = jadwal.hari;
};

const JadwalRequest = function (jadwal) {
  this.id_ruangan = jadwal.id_ruangan;
  this.id_kelas = jadwal.id_kelas;
  this.id_tingkatan = jadwal.id_tingkatan;
  this.id_guru = jadwal.id_guru;
  this.id_murid = jadwal.id_murid;
  this.jam_mulai = jadwal.jam_mulai;
  this.jam_selesai = jadwal.jam_selesai;
  this.hari = jadwal.hari;
};

JadwalRequest.create = (newJadwal, result) => {
  let query = "INSERT INTO jadwal_pembelajaran SET ?";
  sql.query(query, newJadwal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created jadwal: ", { ...newJadwal });
    result(null, { ...newJadwal });
  });
};

Jadwal.getAll = (result) => {
  let query =
    "SELECT j.id_jadwal, j.jam_mulai, j.jam_selesai, j.hari, j.id_guru, g.nama AS nama_guru, j.id_murid, m.nama AS nama_murid, j.id_kelas, k.nama_kelas, j.id_tingkatan, t.nama_tingkatan, j.id_ruangan, r.nama_ruangan FROM jadwal_pembelajaran j INNER JOIN ruangan r ON j.id_ruangan = r.id_ruangan INNER JOIN kelas k ON j.id_kelas = k.id_kelas INNER JOIN tingkatan t ON j.id_tingkatan = t.id_tingkatan INNER JOIN guru g ON j.id_guru = g.id_guru INNER JOIN murid m ON j.id_murid = m.id_murid ORDER BY j.id_jadwal";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("jadwal: ", res);
    result(null, res);
  });
};

Jadwal.getByIdGuru = (id, result) => {
  sql.query(
    "SELECT j.id_jadwal, j.jam_mulai, j.jam_selesai, j.hari, j.id_guru, g.nama AS nama_guru, j.id_murid, m.nama AS nama_murid, j.id_kelas, k.nama_kelas, j.id_tingkatan, t.nama_tingkatan, j.id_ruangan, r.nama_ruangan FROM jadwal_pembelajaran j INNER JOIN ruangan r ON j.id_ruangan = r.id_ruangan INNER JOIN kelas k ON j.id_kelas = k.id_kelas INNER JOIN tingkatan t ON j.id_tingkatan = t.id_tingkatan INNER JOIN guru g ON j.id_guru = g.id_guru INNER JOIN murid m ON j.id_murid = m.id_murid WHERE g.id_guru = ? ORDER BY j.id_jadwal",
    id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found jadwal: ", res[0]);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Jadwal.getByIdMurid = (id, result) => {
  sql.query(
    "SELECT j.id_jadwal, j.jam_mulai, j.jam_selesai, j.hari, j.id_guru, g.nama AS nama_guru, j.id_murid, m.nama AS nama_murid, j.id_kelas, k.nama_kelas, j.id_tingkatan, t.nama_tingkatan, j.id_ruangan, r.nama_ruangan FROM jadwal_pembelajaran j INNER JOIN ruangan r ON j.id_ruangan = r.id_ruangan INNER JOIN kelas k ON j.id_kelas = k.id_kelas INNER JOIN tingkatan t ON j.id_tingkatan = t.id_tingkatan INNER JOIN guru g ON j.id_guru = g.id_guru INNER JOIN murid m ON j.id_murid = m.id_murid WHERE m.id_murid = ? ORDER BY j.id_jadwal",
    id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found jadwal: ", res[0]);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Jadwal.deleteById = (id, result) => {
  sql.query(
    "DELETE FROM jadwal_pembelajaran WHERE id_jadwal = ?",
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

Jadwal.updateById = (id, jadwal, result) => {
  sql.query(
    "UPDATE jadwal_pembelajaran SET id_ruangan = ?, id_kelas = ?, id_tingkatan = ?, id_guru = ?, id_murid = ?, jam_mulai = ?, jam_selesai = ?, hari = ? WHERE id_jadwal = ?",
    [
      jadwal.id_ruangan,
      jadwal.id_kelas,
      jadwal.id_tingkatan,
      jadwal.id_guru,
      jadwal.id_murid,
      jadwal.jam_mulai,
      jadwal.jam_selesai,
      jadwal.hari,
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
      console.log("updated jadwal: ", { ...jadwal });
      result(null, { ...jadwal });
    }
  );
};

module.exports = {
  Jadwal, // Export Jadwal
  JadwalRequest, // Export JadwalRequest
};
