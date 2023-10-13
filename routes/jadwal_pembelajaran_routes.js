const Jadwal = require("../controllers/jadwal_pembelajaran_controller.js");

var router = require("express").Router();

//POST
router.post("/", Jadwal.create);


//GET
router.get("/", Jadwal.getAll);

//PUT
router.put("/:id", Jadwal.updateById);

//DELETE
router.delete("/:id", Jadwal.deleteById);

module.exports = router;