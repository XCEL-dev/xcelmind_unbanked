const OPENAI_API_KEY = "YOUR_REAL_OPENAI_API_KEY"; // Replace with your key

const systemMessage = {
  role: "system",
  content: "You are XCEL MIND™, a helpful and empowering AI assistant built for the unbanked. You speak clearly, offer guidance with warmth, and understand the financial and social realities of underserved communities. Answer each question intelligently and accessibly. Your goal is to uplift and inform."
};

async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userMessage = inputField.value;
  if (!userMessage) return;

  appendMessage("user", userMessage);
  inputField.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, { role: "user", content: userMessage }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    appendMessage("bot", botReply);

  } catch (error) {
    appendMessage("bot", `⚠️ Sorry, I couldn't connect right now: ${error.message}`);
  }
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
