const Pendaftaran = require('../controllers/pendaftaran_controller');

var router = require('express').Router();

//POST
router.post('/', Pendaftaran.create);

//GET
router.get('/', Pendaftaran.getAll);

//PUT
router.put('/:id', Pendaftaran.updateById);

//DELETE
router.delete('/:id', Pendaftaran.deleteById);

module.exports = router;