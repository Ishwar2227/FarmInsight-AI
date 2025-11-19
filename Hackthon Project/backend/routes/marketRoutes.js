const express = require('express');
const { getMarketPrices } = require('../controllers/marketController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/prices', protect, getMarketPrices);

module.exports = router;


