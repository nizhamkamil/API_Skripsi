const Ujian = require("../controllers/ujian_controller");

var router = require('express').Router();

//POST
router.post('/', Ujian.create);

//GET
router.get('/', Ujian.getAll);
router.get('/murid/:id', Ujian.getByIdMurid);
router.get('/guru/:id', Ujian.getByIdGuru);

//PUT
router.put('/:id', Ujian.updateById);

//DELETE
router.delete('/:id', Ujian.deleteById);

module.exports = router;