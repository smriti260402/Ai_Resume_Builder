const express = require('express');
const { generateSummary, improveText, suggestSkills } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect AI routes if desired, or leave public if you want free access
router.use(authMiddleware);

router.post('/summary', generateSummary);
router.post('/improve', improveText);
router.post('/skills', suggestSkills);

module.exports = router;
