const Ruangan = require("../controllers/ruangan_controller");

var router = require("express").Router();

//POST
router.post("/", Ruangan.create);

//GET
router.get("/", Ruangan.getAll);

//PUT
router.put("/:id", Ruangan.updateById);

//DELETE
router.delete("/:id", Ruangan.deleteById);

module.exports = router;
