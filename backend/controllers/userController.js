const User = require('../models/User');

// @desc    Get user profile data
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user progress (add a completed topic)
// @route   PUT /api/users/progress
// @access  Private
const updateProgress = async (req, res) => {
    try {
        const { topicId } = req.body;
        
        if (!topicId) {
            return res.status(400).json({ message: 'Please provide a topicId' });
        }

        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Avoid duplicates
        if (!user.progress.completedTopics.includes(topicId)) {
            user.progress.completedTopics.push(topicId);
            user.progress.totalSolved = user.progress.completedTopics.length;
            await user.save();
        }

        res.json({ progress: user.progress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add or remove bookmark
// @route   POST /api/users/bookmarks
// @access  Private
const toggleBookmark = async (req, res) => {
    try {
        const { algorithmId } = req.body;

        if (!algorithmId) {
            return res.status(400).json({ message: 'Please provide an algorithmId' });
        }

        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const index = user.bookmarks.indexOf(algorithmId);
        
        if (index === -1) {
            user.bookmarks.push(algorithmId); // Add
        } else {
            user.bookmarks.splice(index, 1); // Remove
        }

        await user.save();
        res.json({ bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateProgress,
    toggleBookmark
};
