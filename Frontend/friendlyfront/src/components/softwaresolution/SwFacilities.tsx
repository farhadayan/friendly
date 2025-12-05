//swfacilities.tsx

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function SwFacilities() {
  const facilities = [
    { title: "Modern Office", desc: "Fully equipped workspace for our team." },
    { title: "Development Labs", desc: "State-of-the-art tools & testing environments." },
    { title: "Collaboration Spaces", desc: "Areas designed for creativity & teamwork." },
    { title: "Cloud Infrastructure", desc: "High-performance servers & networks." },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
        Our Facilities
      </Typography>
      <Grid container spacing={4} className="grid-3">
        {facilities.map((fac) => (
          
            <Box className="card">
              <Typography className="card-title">{fac.title}</Typography>
              <Typography className="card-text">{fac.desc}</Typography>
            </Box>
          
        ))}
      </Grid>
    </Box>
  );
}
