const express = require('express');
const {
  getOngs,
  getOng,
  getMeuPerfil,
  atualizarPerfil
} = require('../controllers/ongController');
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const Ong = require('../models/Ong');

const router = express.Router();

router.get('/', advancedResults(Ong), getOngs);
router.get('/:id', getOng);

router
  .route('/me')
  .get(protect, authorize('ong'), getMeuPerfil)
  .put(protect, authorize('ong'), atualizarPerfil);

module.exports = router;
