import React from "react";

export default function AboutUs() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        background: "linear-gradient(45deg, cadetblue, #fff)",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#1E3A8A", textAlign: "center", marginBottom: "40px" }}>
        About Us
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
        <p>
          Welcome to <strong>Friendly Guidance</strong>! We are dedicated to
          providing the best solutions and support for our clients. Our team of
          experts works tirelessly to ensure your queries and concerns are
          addressed efficiently.
        </p>
        <p>
          We believe in transparency, reliability, and professionalism. Whether
          you are looking for guidance, support, or information, we are here to
          help you every step of the way.
        </p>
        <p>
          Our mission is to make your experience smooth and hassle-free by
          offering high-quality assistance and personalized care.
        </p>
      </div>
    </div>
  );
}
