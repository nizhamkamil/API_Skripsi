const tutorial = require("../controllers/tutorial_controller");

var router = require("express").Router();

//POST
router.post("/", tutorial.create);

//DELETE
router.delete("/:id", tutorial.delete);

//GET
router.get("/", tutorial.getAll);
router.get("/:id", tutorial.getById);

//PUT
router.put("/:id", tutorial.updateById);

module.exports = router;
