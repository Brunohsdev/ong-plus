const express = require('express');
const {
  getMeuPerfil,
  atualizarPerfil,
  atualizarSenha
} = require('../controllers/usuarioController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/me')
  .get(protect, getMeuPerfil)
  .put(protect, atualizarPerfil);

router.put('/atualizarsenha', protect, atualizarSenha);

module.exports = router;
