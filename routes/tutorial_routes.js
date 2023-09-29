const tutorial = require("/NodeJs Test/controllers/tutorial_controller");

var router = require("express").Router();

router.post("/", tutorial.create);
router.delete("/:id", tutorial.delete);
module.exports = router;