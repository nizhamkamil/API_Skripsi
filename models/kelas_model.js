const sql = require("./db.js");

const Kelas = function(kelas){
    this.nama_kelas = kelas.nama_kelas;
    this.deskripsi_kelas = kelas.deskripsi_kelas;
}

Kelas.create = (id, result) => {
    let query = "INSERT INTO kelas SET ?";

    sql.query(query, id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created kelas: ", {...id});
        result(null,{...id});
    })
}

Kelas.getAll = result => {
    let query = "SELECT * FROM kelas";

    sql.query(query, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("kelas: ", res);
        result(null,res);
    })
}

Kelas.deleteById = (id,result) => {
    sql.query("DELETE FROM kelas WHERE id_kelas = ?", id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log(res.affectedRows);
        result(null,res);
    })
}

Kelas.updateById = (id,kelas,result) => {
    let query = "UPDATE kelas SET nama_kelas = ?, deskripsi_kelas = ? WHERE id_kelas = ?";

    sql.query(query, [kelas.nama_kelas, kelas.deskripsi_kelas, id], (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log(res.affectedRows);
        result(null,res);
    })
}

module.exports = Kelas;