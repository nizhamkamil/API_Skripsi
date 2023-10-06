const sql = require("./db.js");

const Admin = function(admin){
    this.nama = admin.nama;
    this.username = admin.username;
    this.password = admin.password;
    this.alamat = admin.alamat;
    this.email = admin.email;
    this.no_telpon  = admin.no_telpon;
    this.jenis_kelamin = admin.jenis_kelamin;
    this.tanggal_bergabung = admin.tanggal_bergabung;
}

Admin.login = (username,password,result) => {
    let query = "SELECT * FROM admin WHERE username = ? AND password = ?";
    sql.query(query,[username,password],(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found admin: ", res[0]);
            result(null,{...res[0]});
            return;
        }
        if(!res.length){
            console.log("found admin: ", res[0]);
            result(null,"FAILED");
            return;
        }
        result({kind: "not_found"},null);
    })
}

module.exports = Admin;