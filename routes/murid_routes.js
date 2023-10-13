const Murid = require("../controllers/murid_controller.js");

var router = require("express").Router();

//POST
router.post("/", Murid.create);
router.post("/login", Murid.login);

//GET
router.get("/", Murid.getAll);

//PUT 
router.put("/:id", Murid.updateById);

//DELETE
router.delete("/:id", Murid.deleteById);

module.exports = router;