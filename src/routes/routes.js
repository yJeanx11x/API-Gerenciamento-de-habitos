const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userControler')
router.post('/habits', controllers.criarUsuario)

module.exports = router;