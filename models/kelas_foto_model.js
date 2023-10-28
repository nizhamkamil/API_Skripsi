const sql = require("./db.js");
const fs = require("fs");

const KelasFoto = function (kelasfoto) {
  this.nama_foto = kelasfoto.nama_foto;
  this.path_foto = kelasfoto.path_foto;
  this.id_kelas = kelasfoto.id_kelas;
};

KelasFoto.create = (newKelasFoto, result) => {
  let query = "INSERT INTO kelas_foto SET ?";

  sql.query(query, newKelasFoto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created kelasfoto: ", { ...newKelasFoto });
    result(null, { ...newKelasFoto });
  });
};

KelasFoto.getAll = (result) => {
  let query = "SELECT * FROM kelas_foto";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("kelasfoto: ", res);
    result(null, res);
  });
};

KelasFoto.getById = (id, result) => {
  let query = "SELECT * FROM kelas_foto WHERE id_kelas_foto = ?";

  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log("kelasfoto: ", res);
      result(null, res);
    }
  });
};

KelasFoto.getByKelas = (id, result) => {
  let query = "SELECT * FROM kelas_foto WHERE id_kelas = ?";

  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log("kelasfoto: ", res);
      result(null, res);
    }
  });
};

KelasFoto.deleteById = (id, result) => {
  sql.query(
    "SELECT path_foto FROM kelas_foto WHERE id_kelas_foto = ?",
    id,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (rows.length === 0) {
        // Record not found
        result({ kind: "not_found" }, null);
        return;
      }

      const path_foto = `public/images/${rows[0].path_foto}`;

      // Delete the associated file using the 'fs' module
      fs.unlink(path_foto, (err) => {
        if (err) {
          console.error("Error deleting file: ", err);
          result(err, null);
          return;
        }

        // Now that the file is deleted, proceed to delete the database record
        sql.query(
          "DELETE FROM kelas_foto WHERE id_kelas_foto = ?",
          id,
          (err, res) => {
            if (err) {
              console.log("Error deleting record: ", err);
              result(err, null);
              return;
            }
            console.log(res.affectedRows);
            result(null, res);
          }
        );
      });
    }
  );
};

KelasFoto.updateById = (id, kelasfoto, result) => {
  let query =
    "UPDATE kelas_foto SET nama_foto = ?, path_foto = ?, id_kelas = ? WHERE id_kelas_foto = ?";

  sql.query(
    query,
    [kelasfoto.nama_foto, kelasfoto.path_foto, kelasfoto.id_kelas, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = KelasFoto;
