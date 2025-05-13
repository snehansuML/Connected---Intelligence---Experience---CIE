// src/api/api.js

const askChatGPT = async (question, data) => {
  try {
    const response = await fetch("https://churn-dashboard-final.onrender.com/api/chat", {
      //http://localhost:5001
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question, data })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.answer || "No answer returned.";
  } catch (error) {
    console.error("ChatGPT API error:", error);
    throw error;
  }
};

export default askChatGPT;
