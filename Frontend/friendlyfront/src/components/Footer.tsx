import React from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{
      background: "linear-gradient(90deg, #fff 0%, cadetblue 30%)",
      color: "white",
      py: 1,
    }}>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            textAlign: { xs: "center", md: "right" },
            gap: { xs: 2, md: 0 },
          }}

        >
          {/* Social Icons on the Left */}
          <Grid>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", '&:hover': { opacity: 0.8 } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", '&:hover': { opacity: 0.8 } }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", '&:hover': { opacity: 0.8 } }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Copyright Text on the Right */}
          <Grid>
            <Typography
              variant="body2"
              align="right"
              sx={{
                fontWeight: 300,
                fontSize: { xs: "0.6rem", md: "0.85rem" },
                pl: 5,
                lineHeight: 1.1
              }}
            >
              ©2025 Nordisk Support. All rights reserved.
              <br />
              Technology Solutions | IT Support | Software Development | Data Engineering
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}