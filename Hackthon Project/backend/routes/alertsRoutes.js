const express = require('express');
const { getAlerts } = require('../controllers/alertsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/all', protect, getAlerts);

module.exports = router;


