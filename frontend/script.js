async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value;
    if (!message) return;

    // Afegir missatge de l'usuari a la pantalla
    chatBox.innerHTML += `<div class="user-msg"><b>Tu:</b> ${message}</div>`;
    input.value = "";

    // URL de NGROK (L'hauràs de canviar cada vegada que iniciïs Colab)
    const url = "EL_TEU_URL_DE_NGROK/chat"; 

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        chatBox.innerHTML += `<div class="bot-msg"><b>IA:</b> ${data.response}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div class="error-msg">Error de connexió amb la IA</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
