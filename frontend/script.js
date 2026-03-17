async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value;
    
    if (!message) return;

    // 1. Add User message to the screen
    chatBox.innerHTML += `<div class="user-msg"><b>Tu:</b> ${message}</div>`;
    input.value = "";

    // 2. YOUR LIVE API URL (Already inserted for you!)
    const url = "https://cheryl-nonlacteous-alline.ngrok-free.dev/chat";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                // This skips the ngrok "warning" page so the bot works instantly
                "ngrok-skip-browser-warning": "true" 
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // 3. Add AI response to the screen
        chatBox.innerHTML += `<div class="bot-msg"><b>IA:</b> ${data.response}</div>`;
        
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<div class="error-msg">Error de connexió amb la IA. Recorda tenir el Colab actiu!</div>`;
    }

    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
