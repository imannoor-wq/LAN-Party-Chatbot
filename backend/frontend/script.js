/**
 * PRO+ Logic:
 * This script manages the communication between the user and the Flask Backend.
 * It includes robust error handling to inform the user if the server is offline.
 */

const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// IMPORTANT: Replace this URL with your ngrok URL during the demo
const API_URL = "https://SEU-URL-NGROK.ngrok-free.app/chat";

async function handleChat() {
    const text = userInput.value.trim();
    if (!text) return;

    // Show user message
    addMessage(text, 'user-msg');
    userInput.value = '';

    try {
        // Send to Flask Backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        addMessage(data.response, 'bot-msg');

    } catch (err) {
        // PRO+ Error Handling
        addMessage("Error: No es pot connectar amb el servidor. Revisa si Flask i ngrok estan actius.", 'bot-msg');
        console.error(err);
    }
}

function addMessage(text, className) {
    const div = document.createElement('div');
    div.classList.add('msg', className);
    div.innerText = text;
    chatDisplay.appendChild(div);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

sendBtn.addEventListener('click', handleChat);
