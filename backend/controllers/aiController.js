// @desc    Ask the AI Mentor a question
// @route   POST /api/ai/ask
// @access  Public (for demo purposes)
const askAI = async (req, res) => {
    try {
        const { prompt, code } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        // Simulate a delay to make it feel like real AI processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        let responseText = "I'm your AI Mentor! I can help you with hints, explanations, and code reviews. Try asking me specifically about your code.";

        const lowerPrompt = prompt.toLowerCase();
        const hasCode = code && code.trim().length > 0;

        // Mock AI Logic based on keywords
        if (lowerPrompt.includes('hint')) {
            responseText = "Here's a hint: Check your loop condition. Are you ensuring that the pointers eventually cross? If not, you might end up in an infinite loop!";
        } else if (lowerPrompt.includes('review') && hasCode) {
            responseText = "Your code structure looks good! However, you might want to add some comments explaining the logic, and ensure you handle edge cases (like an empty array).";
        } else if (lowerPrompt.includes('time complexity') || lowerPrompt.includes('complexity')) {
            responseText = "For Binary Search, the time complexity is **O(log N)** because we cut the search space in half with every iteration. The space complexity is **O(1)** if done iteratively.";
        } else if (lowerPrompt.includes('binary search')) {
            responseText = "Binary Search is a divide-and-conquer algorithm. The key is to find the `mid` element and compare it with the `target`. Make sure your array is sorted before applying it!";
        } else if (hasCode && lowerPrompt.includes('bug')) {
            responseText = "I see your code! A common bug in this type of algorithm is an off-by-one error when updating the `left` or `right` pointers (e.g., `left = mid` instead of `left = mid + 1`). Double-check that!";
        }

        res.json({
            response: responseText,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    askAI
};
