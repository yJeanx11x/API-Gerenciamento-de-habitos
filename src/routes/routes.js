const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userControler')
const verifyToken = require('../config/jwt')

router.post('/habits', controllers.criarUsuario)
router.post('/habitsLogin', controllers.habitsLogin)
router.get('/habits/:id', verifyToken.verifyToken, controllers.habitsJwt)

module.exports = router;