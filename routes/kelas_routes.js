const Kelas = require("../controllers/kelas_controller.js");

var router = require("express").Router();

//POST 
router.post("/", Kelas.create);

//GET
router.get("/", Kelas.getAll);

//PUT
router.put("/:id", Kelas.updateById);

//DELETE
router.delete("/:id", Kelas.deleteById);

module.exports = router;