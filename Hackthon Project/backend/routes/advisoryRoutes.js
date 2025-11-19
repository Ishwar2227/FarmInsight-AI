const express = require('express');
const { getCropAdvisory } = require('../controllers/advisoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/crop', protect, getCropAdvisory);

module.exports = router;


