const sql = require("./db.js");
const Tingkatan = require("./tingkatan_model.js");

const Ruangan = function(ruangan){
    this.nama_ruangan = ruangan.nama_ruangan;
    this.deskripsi_ruangan = ruangan.deskripsi_ruangan;
}


Ruangan.create = (id,result) => {
    let query = "INSERT INTO ruangan SET ?";

    sql.query(query, id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        result(null,{...id});
    })
}

Ruangan.getAll = result => {
    let query = "SELECT * FROM ruangan";

    sql.query(query,(err,res) =>{
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        result(null,res);
    })
}

Ruangan.deleteById = (id,result) => {
    sql.query("DELETE FROM ruangan WHERE id_ruangan = ?", id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        result(null,res);
    })
}

Ruangan.updateById = (id,ruangan,result) => {
    let query = "UPDATE ruangan SET nama_ruangan = ?, deskripsi_ruangan = ? WHERE id_ruangan = ?";

    sql.query(query, [ruangan.nama_ruangan, ruangan.deskripsi_ruangan, id], (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        result(null,{...ruangan});
    })
}

module.exports = Ruangan;

