const express = require('express');
const {
  getCampanhas,
  getCampanha,
  createCampanha,
  updateCampanha,
  deleteCampanha
} = require('../controllers/CampanhaController');
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const Campanha = require('../models/Campanha');

const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(Campanha, {
      path: 'ong',
      select: 'descricao areasAtuacao'
    }),
    getCampanhas
  )
  .post(protect, authorize('ong'), createCampanha);

router
  .route('/:id')
  .get(getCampanha)
  .put(protect, authorize('ong'), updateCampanha)
  .delete(protect, authorize('ong'), deleteCampanha);

module.exports = router;
