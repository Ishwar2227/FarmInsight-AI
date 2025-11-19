const express = require('express');
const { getTodayWeather } = require('../controllers/weatherController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/today', protect, getTodayWeather);

module.exports = router;


