//swabout.tsx

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function SwAbout() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 8 }}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
          About Digital Software Solutions
        </Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          We are committed to delivering high-quality software solutions for businesses of all sizes.
          Our mission is to transform ideas into scalable and robust digital products.
        </Typography>

        {/* Team / Values */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          Our Core Values
        </Typography>
        <Grid container spacing={4} className="grid-3">
          {[
            { title: "Innovation", desc: "We constantly push the boundaries of technology." },
            { title: "Quality", desc: "Delivering reliable, bug-free, maintainable code." },
            { title: "Integrity", desc: "Transparency and honesty in all we do." },
          ].map((item) => (
            
              <Box className="card">
                <Typography className="card-title">{item.title}</Typography>
                <Typography className="card-text">{item.desc}</Typography>
              </Box>
            
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
