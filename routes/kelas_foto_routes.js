const KelasFoto = require("../controllers/kelas_foto_controller.js");
const upload = require("../middleware/multer.js");

var router = require("express").Router();

//POST
router.post("/", KelasFoto.create);
router.post("/upload", upload.single("photo"), KelasFoto.upload);

//GET
router.get("/", KelasFoto.getAll);
router.get("/:id", KelasFoto.getById);
router.get("/kelas/:id", KelasFoto.getByKelas);

//PUT
router.put("/:id", KelasFoto.updateById);

//DELETE
router.delete("/:id", KelasFoto.deleteById);

module.exports = router;
