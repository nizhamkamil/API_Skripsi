const Guru = require("../controllers/guru_controller.js");

var router = require("express").Router();

//POST
router.post("/", Guru.create);
router.post("/login", Guru.login);

//GET
router.get("/", Guru.getAll);

//PUT
router.put("/:id", Guru.updateById);

//DELETE
router.delete("/:id", Guru.deleteById);

module.exports = router;

