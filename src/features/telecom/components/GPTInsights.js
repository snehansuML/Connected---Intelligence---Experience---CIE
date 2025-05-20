// src/components/GPTInsights.js
import React, { useState, useEffect } from "react";
import askChatGPT from "api/api";
import { jsPDF } from "jspdf";

export default function GPTInsights() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  // Load customer dataset
  useEffect(() => {
    fetch("/data/telecom_customers_with_clusters.json")
      .then(res => res.json())
      .then(data => {
        setCustomerData(data);
        console.log("Customer data loaded:", data.length);
      })
      .catch(err => console.error("Failed to load customer data:", err));
  }, []);

  const handleChat = async () => {
    console.log("CLICKED:", question);

    if (!question || customerData.length === 0) {
      console.warn("Missing input or data");
      setResponse("⚠️ Please enter a question and make sure data is loaded.");
      return;
    }

    setLoading(true);
    setResponse("Thinking...");

    try {
      const reply = await askChatGPT(question, customerData);
      console.log("LLM Reply:", reply);
      setResponse(reply || "No response from LLM.");
    } catch (err) {
      console.error("LLM error:", err);
      setResponse("❌ Error reaching LLM backend.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("LLM Response:", 10, 10);
    const splitText = doc.splitTextToSize(response, 180);
    doc.text(splitText, 10, 20);
    doc.save("chat_response.pdf");
  };

  return (
    <div className="chart-card" style={{ padding: "1rem" }}>
      <h3>Ask LLM, About Your Customer Data</h3>

      <input
        type="text"
        placeholder="e.g. Why is churn high in Cluster 3?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* Download Prompts.txt link */}
      <div style={{ marginBottom: "1rem" }}>
        <a
          href="/Prompts.txt"
          download
          style={{
            fontSize: "0.9rem",
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          📄 Download Sample Prompts (Prompts.txt)
        </a>
      </div>

      <button
        onClick={handleChat}
        disabled={loading}
        style={{
          padding: "0.5rem 1.25rem",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          marginRight: "1rem",
          fontWeight: "bold"
        }}
      >
        {loading ? "Thinking..." : "Ask LLM"}
      </button>

      {response && (
        <div
          style={{
            marginTop: "1.5rem",
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            lineHeight: "1.6"
          }}
        >
          <strong>Response:</strong>
          <p>{response}</p>

          <button
            onClick={downloadPDF}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "6px"
            }}
          >
            Download Chat as PDF
          </button>
        </div>
      )}
    </div>
  );
}
