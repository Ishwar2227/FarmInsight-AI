const Alert = require('../models/Alert');

/**
 * Returns alerts for the authenticated user or global alerts if no user.
 */
const getAlerts = async (req, res, next) => {
  try {
    let alerts = [];

    if (req.user) {
      alerts = await Alert.find({ userId: req.user._id }).sort({ createdAt: -1 });
    }

    if (!alerts.length) {
      alerts = [
        {
          title: 'Pest Outbreak Warning',
          message: 'High incidence of stem borer reported nearby. Inspect fields promptly.',
          createdAt: new Date(),
        },
        {
          title: 'Irrigation Alert',
          message: 'Rain forecast for tonight. Delay irrigation by 24 hours.',
          createdAt: new Date(),
        },
      ];
    }

    res.json({ success: true, data: alerts });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAlerts };


