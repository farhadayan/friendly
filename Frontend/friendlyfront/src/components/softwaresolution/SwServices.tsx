//swservice.tsx

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function SwServices() {
  const services = [
    { title: "Web Development", desc: "Modern responsive websites & apps." },
    { title: "Mobile Apps", desc: "iOS and Android solutions tailored to your needs." },
    { title: "Cloud Solutions", desc: "Scalable cloud-based systems & migrations." },
    { title: "Software Consulting", desc: "Strategy, architecture & tech guidance." },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
        Our Services
      </Typography>
      <Grid container spacing={4} className="grid-3">
        {services.map((service) => (
          
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box className="card">
                <Typography className="card-title">{service.title}</Typography>
                <Typography className="card-text">{service.desc}</Typography>
              </Box>
            </motion.div>
          
        ))}
      </Grid>
    </Box>
  );
}
