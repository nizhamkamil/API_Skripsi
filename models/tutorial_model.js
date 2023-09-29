const { error } = require("console");
const sql = require("./db.js");

const Tutorial = function(tutorial){
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
}

Tutorial.create = (req,result) => {
    sql.query("INSERT INTO tutorials SET ?", req, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created tutorial: ",{id: res.insertId, ...req})
        result(null,{id: res.insertId, ...req});
    })
}

Tutorial.delete = (req,result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", req, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("deleted tutorial with id: ", req);
        result(null,res);
    })
}

module.exports = Tutorial;