const express = require('express');
const {
  criarDoacao,
  getMinhasDoacoes,
  getDoacoesCampanha
} = require('../controllers/doacaoController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, criarDoacao);

router.get('/minhas', protect, getMinhasDoacoes);
router.get('/campanha/:id', getDoacoesCampanha);

module.exports = router;
