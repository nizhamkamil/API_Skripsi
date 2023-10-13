const sql = require("./db.js");

const Pendaftaran = function(pendaftaran){
    this.id_murid = pendaftaran.id_murid;
    this.id_kelas = pendaftaran.id_kelas;
    this.id_admin = pendaftaran.id_admin;
    this.tanggal_pendaftaran = pendaftaran.tanggal_pendaftaran;
    this.status_pendaftaran = pendaftaran.status_pendaftaran;
}

Pendaftaran.create = (pendaftaran, result) => {
    let query = "INSERT INTO pendaftaran SET ?";

    sql.query(query, pendaftaran, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created pendaftaran: ", {...pendaftaran});
        result(null,{...pendaftaran});
    })
}

Pendaftaran.getAll = result => {
    let query = "SELECT * FROM pendaftaran";

    sql.query(query, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("pendaftaran: ", res);
        result(null,res);
    })
}

Pendaftaran.deleteById = (id,result) => {
    sql.query("DELETE FROM pendaftaran WHERE id_pendaftaran = ?", id, (err,res) => {
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

Pendaftaran.updateById = (id,pendaftaran,result) => {
    let query = "UPDATE pendaftaran SET id_murid = ?, id_kelas = ?, id_admin = ?, tanggal_pendaftaran = ?, status_pendaftaran = ? WHERE id_pendaftaran = ?";

    sql.query(query, [pendaftaran.id_murid, pendaftaran.id_kelas, pendaftaran.id_admin, pendaftaran.tanggal_pendaftaran, pendaftaran.status_pendaftaran, id], (err,res) => {
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

module.exports = Pendaftaran;