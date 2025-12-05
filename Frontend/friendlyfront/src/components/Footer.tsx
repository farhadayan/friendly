import React from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1e40af", color: "white", py: 8 }}>
      <Container maxWidth="lg">
        <Grid spacing={4}>
          {/* Company Info */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Friendly IT Support
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Providing professional IT support and services for homes and
              businesses. Reliable, fast, and affordable solutions.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">(555) 123-HELP</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">support@friendlyit.com</Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink component={Link} to="/" color="inherit" underline="hover">
                Home
              </MuiLink>
              <MuiLink
                component={Link}
                to="/services/itsupport"
                color="inherit"
                underline="hover"
              >
                Services
              </MuiLink>
              <MuiLink component={Link} to="/about" color="inherit" underline="hover">
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit" underline="hover">
                Contact
              </MuiLink>
            </Box>
          </Grid>

          {/* Services */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink component={Link} to="/services/desktop-support" color="inherit" underline="hover">
                Desktop & Laptop Support
              </MuiLink>
              <MuiLink component={Link} to="/services/network-solutions" color="inherit" underline="hover">
                Network Solutions
              </MuiLink>
              <MuiLink component={Link} to="/services/cloud-services" color="inherit" underline="hover">
                Cloud Services
              </MuiLink>
              <MuiLink component={Link} to="/services/cybersecurity" color="inherit" underline="hover">
                Cybersecurity
              </MuiLink>
              <MuiLink component={Link} to="/services/data-recovery" color="inherit" underline="hover">
                Data Recovery
              </MuiLink>
              <MuiLink component={Link} to="/services/24-7-support" color="inherit" underline="hover">
                24/7 IT Support
              </MuiLink>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "white" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "white" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: "white" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ mt: 6, textAlign: "center", opacity: 0.7 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Friendly IT Support. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}