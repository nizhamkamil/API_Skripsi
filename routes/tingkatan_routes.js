const Tingkatan = require("/NodeJs Test/controllers/tingkatan_controller");

var router = require("express").Router();

//POST
router.post("/", Tingkatan.create);

//GET
router.get("/", Tingkatan.getAll);


//PUT
router.put("/:id", Tingkatan.updateById);

//DELETE
router.delete("/:id", Tingkatan.deleteById);

module.exports = router;