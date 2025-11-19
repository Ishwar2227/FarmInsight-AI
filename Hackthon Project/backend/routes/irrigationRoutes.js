const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const { getIrrigationSuggestion } = require('../controllers/irrigationController');

const router = express.Router();

router.post(
  '/suggest',
  protect,
  [
    body('cropType').notEmpty().withMessage('Crop type is required'),
    body('soilMoisture').isNumeric().withMessage('Soil moisture must be a number'),
    body('upcomingRain').isBoolean().withMessage('Upcoming rain must be true/false'),
  ],
  getIrrigationSuggestion
);

module.exports = router;


