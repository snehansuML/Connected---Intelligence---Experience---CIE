import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === "admin" && password === "admin@123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/landing");
    } else {
      setError("❌ Invalid credentials. Try admin / admin@123");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ marginBottom: "2rem", color: "#0f62fe", fontSize: "2rem" }}>
        🔐 Connected Intelligence Expereinces - CIE
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "3rem 3.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          border: "2px solid #0f62fe",
          minWidth: "350px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "bold" }}>Username</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="admin"
            style={{
              padding: "0.75rem",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "0.5rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin@123"
            style={{
              padding: "0.75rem",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "0.5rem",
            }}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0f62fe",
            color: "white",
            border: "none",
            borderRadius: "6px",
            width: "100%",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
