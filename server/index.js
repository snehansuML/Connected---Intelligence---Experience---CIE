const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// POST /api/chat → handles ChatGPT requests
app.post("/api/chat", async (req, res) => {
  const { question, data } = req.body;

  if (!question || !data) {
    return res.status(400).json({ error: "Missing question or data in request body." });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a customer insights analyst. Use the data and answer clearly." },
          { role: "user", content: `Customer data:\n${JSON.stringify(data).slice(0, 20000)}\n\nQuestion:\n${question}` }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ answer: reply });
  } catch (err) {
    console.error("❌ OpenAI API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from ChatGPT" });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
