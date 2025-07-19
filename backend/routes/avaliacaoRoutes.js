const express = require('express');
const {
  criarAvaliacao,
  getAvaliacoes,
  getMinhasAvaliacoes
} = require('../controllers/avaliacaoController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, criarAvaliacao)
  .get(getAvaliacoes);

router.get('/minhas', protect, getMinhasAvaliacoes);

module.exports = router;
