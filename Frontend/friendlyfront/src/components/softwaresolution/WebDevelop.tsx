import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function WebDevelop() {
    return (
    
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #D3D3D3 0%, #1e40af 100%)",
          color: "white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2, fontSize: { xs: "2.2rem", md: "3rem" } }}
          >
            Web Development
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: "800px", mx: "auto", opacity: 0.9 }}
          >
            Reliable, affordable, and expert digital solutions for businesses. From website development to advanced e-commerce, we’ve got  
            you covered 24/7.
          </Typography>
        </Container>
      </Box>
    </Box>
    
    );
}
