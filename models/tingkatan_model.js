const { error } = require("console");
const sql = require("./db.js");

const Tingkatan = function(tingkatan){
    this.nama_tingkatan = tingkatan.nama_tingkatan;
    this.deskripsi_tingkatan = tingkatan.deskripsi_tingkatan;
}

Tingkatan.create = (id, result) => {
    let query = "INSERT INTO tingkatan SET ?";

    sql.query(query, id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created tingkatan: ", {...id});
        result(null,{...id});
    })
}

Tingkatan.getAll = result => {
    let query = "SELECT * FROM tingkatan";

    sql.query(query, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("tingkatan: ", res);
        result(null,res);
    })
}

Tingkatan.deleteById = (id,result) => {
    sql.query("DELETE FROM tingkatan WHERE id_tingkatan = ?", id, (err,res) => {
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

Tingkatan.updateById = (id,tingkatan,result) => {
    let query = "UPDATE tingkatan SET nama_tingkatan = ?, deskripsi_tingkatan = ? WHERE id_tingkatan = ?";

    sql.query(query, [tingkatan.nama_tingkatan, tingkatan.deskripsi_tingkatan, id], (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log("updated tingkatan: ", {id: id, ...tingkatan});
        result(null,{id: id, ...tingkatan});
    })
}

module.exports = Tingkatan;