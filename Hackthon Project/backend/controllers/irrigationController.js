const { validationResult } = require('express-validator');

/**
 * Returns a simple irrigation suggestion based on soil moisture and crop type.
 */
const getIrrigationSuggestion = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { cropType, soilMoisture, upcomingRain } = req.body;

  let suggestion = 'Maintain regular irrigation schedule.';
  if (soilMoisture < 35) {
    suggestion = 'Soil moisture is low. Irrigate in the next 4 hours.';
  } else if (soilMoisture > 70) {
    suggestion = 'Soil moisture is adequate. Delay irrigation for 24 hours.';
  }

  if (upcomingRain) {
    suggestion = 'Rain expected soon. Pause irrigation to conserve water.';
  }

  res.json({
    success: true,
    data: {
      cropType,
      soilMoisture,
      upcomingRain,
      recommendation: suggestion,
      tips: [
        'Use drip irrigation to conserve water',
        'Mulch around the crops to retain moisture',
        'Monitor soil moisture twice daily',
      ],
    },
    message: 'Irrigation suggestion generated',
  });
};

module.exports = { getIrrigationSuggestion };


