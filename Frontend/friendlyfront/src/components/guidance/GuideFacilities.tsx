import React from "react";

export default function Facilities() {
  const facilities = [
    {
      title: "Expert Guidance",
      description: "Get support from our experienced team for all your queries.",
    },
    {
      title: "24/7 Support",
      description: "We are available round the clock to assist you anytime.",
    },
    {
      title: "Personalized Assistance",
      description: "Tailored solutions to meet your unique requirements.",
    },
    {
      title: "Secure Communication",
      description: "All your data and queries are handled securely.",
    },
    {
      title: "Fast Response",
      description: "We ensure quick replies to all your queries and requests.",
    },
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
        Our Facilities
      </h1>
      <div
        style={{
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {facilities.map((facility, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              textAlign: "center",
              color: "#333",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>{facility.title}</h3>
            <p>{facility.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
