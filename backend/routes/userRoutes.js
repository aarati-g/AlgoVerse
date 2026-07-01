const express = require('express');
const router = express.Router();
const { getUserProfile, updateProgress, toggleBookmark } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.put('/progress', protect, updateProgress);
router.post('/bookmarks', protect, toggleBookmark);

module.exports = router;
