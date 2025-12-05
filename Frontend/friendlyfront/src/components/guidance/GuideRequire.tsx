import React from "react";

export default function Requirements() {
  const requirements = [
    "Complete the registration form.",
    "Provide valid contact information.",
    "IELTS score of 6.0 or equivalent.",
    "Agree to our terms and conditions.",
    "Submit the form before the deadline.",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(45deg, cadetblue, #fff)",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#1E3A8A", textAlign: "center", marginBottom: "40px" }}>
        Requirements
      </h1>
      <div
        style={{
          maxWidth: "800px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          color: "#333",
        }}
      >
        <ul style={{ lineHeight: "1.8", paddingLeft: "20px", textAlign:"justify" }}>
          {requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
