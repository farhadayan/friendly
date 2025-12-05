import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Phone as PhoneIcon, Email as EmailIcon } from "@mui/icons-material";

export default function Contact() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle form submission (e.g., API call)
    
    alert("Thank you! We received your message.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          color: "white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Contact Friendly IT Support
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Have an IT problem or need professional assistance? Fill out the
            form below, or reach us directly via phone or email. We're available
            24/7 to assist you.
          </Typography>
        </Container>
      </Box>

      {/* Contact Form + Info Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid spacing={6}>
          {/* Contact Form */}
          <Grid size={{xs:12, md:6}}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
              Send Us a Message
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 3 }}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 3 }}
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={6}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{xs:12, md:6}}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
              Get in Touch
            </Typography>
            <Paper
              sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PhoneIcon sx={{ fontSize: 40, color: "#2563eb" }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Call Us
                  </Typography>
                  <Typography variant="body1">(555) 123-HELP</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon sx={{ fontSize: 40, color: "#2563eb" }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Email Us
                  </Typography>
                  <Typography variant="body1">support@friendlyit.com</Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  Office Hours
                </Typography>
                <Typography variant="body1">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Emergency Support Only
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: "#f8fafc", py: 8, textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Need Immediate IT Assistance?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
          >
            Our certified IT team is available 24/7 for urgent issues. Don't
            wait—get help now!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PhoneIcon />}
            sx={{ px: 4, py: 1.5 }}
          >
            Call Emergency Line
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
