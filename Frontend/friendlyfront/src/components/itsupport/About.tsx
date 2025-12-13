import React from "react";
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Typography,
  Card,

  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  List,

  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Rocket as RocketIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const why = [
    "End-to-End Tech Services — one partner for IT, software, and data",
    "Startup Friendly Pricing — high quality without corporate prices",
    "Experienced Team — skilled in modern tools and technologies",
    "Fast Response Times — support when you need it",
    "Flexible Solutions — we adapt to your business needs"
  ]
  const team = [
    {
      name: "Georg Hansen",
      role: "IT Manager",
      avatar: "/images/team/sophia.jpg",
      description:
        "Expert in IT management and architect solutions over 10 years of experoence..",
    },
    {
      name: "Abarat Hossain",
      role: "IT Specialist",
      avatar: "/images/team/alice.jpg",
      description:
        "Expert in laptop and desktop solutions over 6 years of experience.",
    },
    {
      name: "F. Ahmed",
      role: "Cloud Solutions",
      avatar: "/images/team/michael.jpg",
      description:
        "Helps businesses migrate and manage their cloud environments efficiently. Skilled on server installation and operational",
    },
    {
      name: "Sophia Lee",
      role: "IT Support Technician",
      avatar: "/images/team/sophia.jpg",
      description:
        "Passionate about helping clients troubleshoot issues quickly and effectively.",
    },
    {
      name: "Shamima Nasrin",
      role: "IT Support Technician",
      avatar: "/images/team/sophia.jpg",
      description:
        "Passionate about helping clients troubleshoot issues quickly and effectively.",
    },
    {
      name: "Faiza Ahmed",
      role: "IT Support Technician",
      avatar: "/images/team/sophia.jpg",
      description:
        "Passionate about helping clients troubleshoot issues quickly and effectively.",
    }

  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `
            linear-gradient(90deg, #f8fafc 0%, transparent 25%),
            linear-gradient(270deg, #f8fafc 0%, transparent 25%),
            linear-gradient(180deg, cadetblue 0%, transparent 90%)
          `,
          py: { xs: 4, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Nordisk Support
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
            deliver professional IT services that drive business efficiency.
            Our core purpose is to eliminate technology as a barrier, providing
            robust and proactive support that allows you to dedicate your energy to
            what matters most—your vision and your bottom line
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 2,
                boxShadow: 3

              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                To provide fast, reliable, and affordable IT support to our
                clients. We aim to minimize downtime, secure data, and ensure
                technology works seamlessly for everyone we serve.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                To be the most trusted IT solution partner for businesses and
                individuals, delivering innovative solutions, expert guidance,
                and exceptional customer service.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ backgroundColor: "transparent", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6
          }}>

            {/* Left side: Text */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
                What Makes Us Different
              </Typography>

              <List dense>
                {why.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Right side: Image */}
            <Box sx={{
              flex: 1,
              display: { xs: "none", md: "block" } // Hide image on mobile if needed
            }}>
              <img
                src="/logos/whyus.png"
                alt="Make us diff"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, transparent 0%, cadetblue 100%)"
                }}
              />
            </Box>

          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Work With Nordisk Support
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          Ready to get professional support for your business? Our
          experts are standing by to help you with fast and reliable solutions.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/itsupport/contact"
          startIcon={<RocketIcon />}
          sx={{
            px: 4, py: 1.5, background:
              "linear-gradient(135deg, transparent 0%, #1e40af 100%)"
          }}
        >
          Contact Us Today
        </Button>
      </Container>
    </Box>
  );
}
