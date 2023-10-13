const sql = require('./db.js');

const Jadwal = function(jadwal){
    this.id_ruangan = jadwal.id_ruangan;
    this.id_kelas = jadwal.id_kelas;
    this.id_tingkatan = jadwal.id_tingkatan;
    this.id_guru = jadwal.id_guru;
    this.id_murid = jadwal.id_murid;
    this.jam_mulai = jadwal.jam_mulai;
    this.jam_selesai = jadwal.jam_selesai;
    this.hari = jadwal.hari;
}

Jadwal.create = (newJadwal,result) => {
    let query = "INSERT INTO jadwal_pembelajaran SET ?";
    sql.query(query,newJadwal,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created jadwal: ", {...newJadwal});
        result(null,{...newJadwal});
    });
}

Jadwal.getAll = result => {
    let query = "SELECT * FROM jadwal_pembelajaran";
    sql.query(query,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("jadwal: ", res);
        result(null,res);
    });
}

Jadwal.deleteById = (id,result) => {
    sql.query("DELETE FROM jadwal_pembelajaran WHERE id_jadwal = ?", id, (err,res) => {
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
    });
}

Jadwal.updateById = (id,jadwal,result) => {
    sql.query("UPDATE jadwal_pembelajaran SET id_ruangan = ?, id_kelas = ?, id_tingkatan = ?, id_guru = ?, id_murid = ?, jam_mulai = ?, jam_selesai = ?, hari = ? WHERE id_jadwal = ?",[jadwal.id_ruangan,jadwal.id_kelas,jadwal.id_tingkatan,jadwal.id_guru,jadwal.id_murid,jadwal.jam_mulai,jadwal.jam_selesai,jadwal.hari,id],(err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log("updated jadwal: ", {...jadwal});
        result(null,{...jadwal});
    });
}

module.exports = Jadwal;