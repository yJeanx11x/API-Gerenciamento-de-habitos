const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userControler')
router.post('/habits', controllers.criarUsuario)
router.post('/habitsLogin', controllers.habitsLogin)

module.exports = router;