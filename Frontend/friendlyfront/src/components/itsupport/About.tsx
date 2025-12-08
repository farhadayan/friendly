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
} from "@mui/material";
import { Rocket as RocketIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          background: "linear-gradient(135deg, #D3D3D3 0%, #1e40af 100%)",
          color: "white",
          py: { xs: 6, md: 12 },
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
            About Friendly IT Support
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
            Friendly IT Support has been providing professional IT services to
            homes and businesses for over a decade. Our mission is simple: keep
            your technology running smoothly so you can focus on what matters
            most.
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
                To be the most trusted IT support partner for businesses and
                individuals, delivering innovative solutions, expert guidance,
                and exceptional customer service.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ backgroundColor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg" >
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={4} >
            {team.map((member, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 2,
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2">{member.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Work With Friendly IT Support
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          Ready to get professional IT support for your home or business? Our
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
              "linear-gradient(135deg, #D3D3D3 0%, #1e40af 100%)"
          }}
        >
          Contact Us Today
        </Button>
      </Container>
    </Box>
  );
}
