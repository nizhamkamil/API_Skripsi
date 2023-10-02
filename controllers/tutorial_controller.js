const Tutorial = require("../models/tutorial_model.js");

exports.create = (req,res) => {
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    })

    Tutorial.create(tutorial,(err,data) => {
        res.send(data);
    })
};

exports.updateById = (req,res) => {
    const id = req.params.id;

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    })

    Tutorial.updateById(id,tutorial,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while updating tutorial with id = " + id
            })
        }else{
            res.send(data);
        }
    });
}

exports.getById = (req,res) => {
    const id = req.params.id;
    Tutorial.getById(id,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tutorial with id = " + id
            })
        }else{
            res.send(data);
        }
    })
}



exports.getAll = (err,res) => {
    Tutorial.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tutorials."
            })
        }else{
            res.send(data);
        }
    })
}

exports.delete = (req,res) => {
    Tutorial.delete(req.params.id,(err,data) => {
        //NAMA YANG DI PARAMS ID HARUS SAMA DENGAN PEMANGGILAN YANG DI ROUTES 
        console.log(req.params.id + 'ini IDNYA')
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while deleting the tutorial."
            })
        }else{
            res.send({
                message: "Tutorial deleted successfully."
            })
        }
    })
}