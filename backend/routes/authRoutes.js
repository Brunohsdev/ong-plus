const express = require('express');
const {
  registrar,
  login,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;