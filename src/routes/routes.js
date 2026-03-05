const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userControler')
const jwt = require('../config/jwt')

router.post('/habits', controllers.criarUsuario)
router.post('/habitsLogin', controllers.habitsLogin)
router.get('/habits/:id', jwt.verifyToken, controllers.habitsJwt)
router.patch('/habits/:id',jwt.verifyToken,controllers.atualizarHabitos)
module.exports = router;