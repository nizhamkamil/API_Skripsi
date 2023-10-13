const sql = require('./db.js');

const Murid = function(murid){
    this.nama = murid.nama;
    this.username = murid.username;
    this.password = murid.password;
    this.alamat = murid.alamat;
    this.email = murid.email;
    this.no_telepon  = murid.no_telepon;
    this.jenis_kelamin = murid.jenis_kelamin;
    this.tanggal_masuk = murid.tanggal_masuk;
    this.agama = murid.agama;
    this.kewarganegaraan = murid.kewarganegaraan;
    this.status_daftar = murid.status_daftar;
    this.nama_wali = murid.nama_wali;
    this.tanggal_lahir = murid.tanggal_lahir;
}

Murid.login = (username,password,result) => {
    let query = "SELECT * FROM murid WHERE username = ? AND password = ?";
    sql.query(query,[username,password],(err,res) => {
        if(err){
            console.log("error", err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found murid: ", res[0]);
            result(null,{...res[0]});
            return;
        }
        if(!res.length){
            console.log("found murid: ", res[0]);
            result(null,"FAILED");
            return;
        }
        result({kind: "not_found"},null);
    });
}

Murid.create = (newMurid,result) => {
    let query = "INSERT INTO murid SET ?";
    sql.query(query,newMurid,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created murid: ", {...newMurid});
        result(null,{...newMurid});
    });
}

Murid.getAll = result => {
    let query = "SELECT * FROM murid";
    sql.query(query,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("murid: ", res);
        result(null,res);
    });
}

Murid.deleteById = (id,result) => {
    sql.query("DELETE FROM murid WHERE id_murid = ?", id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log("deleted murid with id: ", id);
        result(null,res);
    });
}

Murid.updateById = (id,murid,result) => {
    sql.query("UPDATE murid SET nama = ?, username = ?, password = ?, alamat = ?, email = ?, no_telepon = ?, jenis_kelamin = ?, tanggal_masuk = ?, agama = ?, kewarganegaraan = ?, status_daftar = ?, nama_wali = ?, tanggal_lahir = ? WHERE id_murid = ?", [murid.nama,murid.username,murid.password,murid.alamat,murid.email,murid.no_telepon,murid.jenis_kelamin,murid.tanggal_masuk,murid.agama,murid.kewarganegaraan,murid.status_daftar,murid.nama_wali,murid.tanggal_lahir,id], (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log("updated murid: ", {...murid});
        result(null,{...murid});
    });
}

module.exports = Murid;