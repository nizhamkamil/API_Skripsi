const Admin = require("../controllers/admin_controller");

var router = require("express").Router();

//POST
router.post("/login", Admin.login);

module.exports = router;
