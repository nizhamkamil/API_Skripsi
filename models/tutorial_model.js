const { error } = require("console");
const sql = require("./db.js");

const Tutorial = function(tutorial){
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
}

//GET ALL
Tutorial.getAll = (result) => {
    let query = "SELECT * FROM tutorials";

    sql.query(query,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("tutorials: ", res);
        result(null,res);
    });
}

//GET SESUAI ID
Tutorial.getById = (id,result) => {
    let query = "SELECT * FROM tutorials WHERE id = ?";

    sql.query(query, id,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.length){
            console.log("found tutorial: ", res[0]);
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    });
}

//UPDATE
Tutorial.updateById = (id,tutorial,result) => {
    let query = "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?";

    sql.query(query, [tutorial.title, tutorial.description, tutorial.published, id], (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log("updated tutorial: ", {id: id, ...tutorial});
        result(null,{id: id, ...tutorial});
    })
}

//INSERT BARU
Tutorial.create = (id,result) => {
    sql.query("INSERT INTO tutorials SET ?", id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created tutorial: ",{id: res.insertId, ...id})
        result(null,{id: res.insertId, ...id});
    })
}

//DELETE EXISTING
Tutorial.delete = (id,result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("deleted tutorial with id: ", id);
        result(null,res);
    })
}

module.exports = Tutorial;