document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const btnClear = document.getElementById('btnClear');
    
    // AI Elements
    const aiInput = document.getElementById('aiInput');
    const btnSendAI = document.getElementById('btnSendAI');
    const chatHistory = document.getElementById('chatHistory');
    const codeEditor = document.getElementById('codeEditor');

    // Tab Switching Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');
            
            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'flex'; // Use flex for layout
            
            // Hide clear button if AI tab
            if (targetId === 'aiView') {
                btnClear.style.display = 'none';
            } else {
                btnClear.style.display = 'block';
            }
        });
    });

    // Helper: Add Message to Chat
    const addChatMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}-msg`;
        div.innerHTML = `<p>${text}</p>`;
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    // AI Communication
    const sendToAI = async () => {
        const prompt = aiInput.value.trim();
        if (!prompt) return;

        // Display user message
        addChatMessage(prompt, 'user');
        aiInput.value = '';
        
        // Show loading
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.className = `chat-msg ai-msg`;
        loadingDiv.id = loadingId;
        loadingDiv.innerHTML = `<p>Thinking...</p>`;
        chatHistory.appendChild(loadingDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        try {
            // Call our Backend Mock AI Service
            // (In a real app, this would be a full URL if running on a separate domain)
            const response = await fetch('http://localhost:5000/api/ai/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    code: codeEditor.value // Pass the current code context
                })
            });

            const data = await response.json();
            
            // Remove loading
            document.getElementById(loadingId).remove();
            
            if (response.ok) {
                addChatMessage(data.response, 'ai');
            } else {
                addChatMessage("Error: " + data.message, 'ai');
            }

        } catch (error) {
            document.getElementById(loadingId).remove();
            addChatMessage("Failed to connect to AI server. Please make sure the backend is running.", 'ai');
        }
    };

    // Send on button click
    btnSendAI.addEventListener('click', sendToAI);

    // Send on Enter key
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendToAI();
        }
    });
});
