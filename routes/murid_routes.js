const Murid = require("../controllers/murid_controller.js");
const { route } = require("./ujian_routes.js");

var router = require("express").Router();

//POST
router.post("/", Murid.create);
router.post("/login", Murid.login);

//GET
router.get("/", Murid.getAll);
router.get("/:id", Murid.getById);

//PUT 
router.put("/:id", Murid.updateById);

//DELETE
router.delete("/:id", Murid.deleteById);

module.exports = router;