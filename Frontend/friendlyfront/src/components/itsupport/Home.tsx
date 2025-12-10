import React from "react";
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,

  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  CheckCircle as CheckCircleIcon,
  Security as SecurityIcon,
  Code as SoftwareIcon,
  Cloud as CloudIcon,
  Computer as ComputerIcon,
  Phone as PhoneIcon,
  Support as SupportIcon,
  Build as BuildIcon,
  NetworkCheck as NetworkIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const services = [
    {
      icon: <ComputerIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "IT Help Desk",
      link: "/itsupport/itservices",
      description:
        "Keep your business running smoothly with expert hardware, networking, and cybersecurity support.",
    },
    {
      icon: <SoftwareIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Software Solutions",
      link: "/itsupport/swservices",
      description: "Scalable, efficient, and custom-built applications designed around your business needs.",
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Data Engineering",
      description: "Turn raw data into actionable insights with clean pipelines, optimized databases, and structured reporting systems.",
    }
  ];


  const features = [
    "Skilled and experienced IT specialists",
    "Lightning-fast response times (average under 30 minutes)",
    "Affordable pricing, no hidden fees",
    "Remote and onsite support availability",
    "No long-term contracts required",
  ];

  return (
    <Box sx={{
      overflow: "hidden", background: "transparent"
    }}>

      {/* Hero Section */}

      <Box
        sx={{
          flex: 1,
          m: 0,
          p: 0,
          px: 0,
          py: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Box
          sx={{
            flex: 1,
            m: 0,
            p: { xs: 0, md: 4 },
            backdropFilter: "blur(10px)",
            background: "linear-gradient(90deg, transparent 0%, cadetblue 100%)",
            minHeight: "500px",
            maxHeight: "500px"

          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
              fontSize: { xs: "1.2rem", md: "3rem", lg: "3.5rem" }
            }}
          >
            Reliable IT Solutions
            <Box
              component="span"
              sx={{
                background: "var(--header-bg)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Anytime You Need
            </Box>
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{

              mb: 4,
              textAlign: "center",
              opacity: 0.9,
              fontSize: { xs: "0.8rem", md: "1.4rem" },
              lineHeight: 1.6,
            }}
          >
            From startups to established enterprises, we deliver fast, affordable
            and professional IT solutions. Available 24/7 to keep your systems running smoothly.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/itsupport/contact"
              sx={{
                backgroundColor: "white",
                borderColor: "#000",
                color: "#0A0A0A",
                px: 4,
                py: 1.5,
                fontSize: isMobile ? "0.9rem" : "1.1rem",
                fontWeight: "bold",
                minWidth: isMobile ? "120px" : "auto",
                "&:hover": {
                  backgroundColor: "#f8fafc",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Support Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/itsupport/itservices"
              sx={{
                backgroundColor: "white",
                borderColor: "#000",
                color: "#0A0A0A",
                px: 4,
                py: 1.5,
                fontSize: isMobile ? "0.9rem" : "1.1rem",
                minWidth: isMobile ? "200px" : "auto",
                "&:hover": {
                  backgroundColor: "#f8fafc",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Explore Services
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            //display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: { xs: "none", md: "flex" }
          }}
        >
          <img
            src="/logos/home.jpg"
            alt="IT Support Illustration"
            style={{ width: "100%", minHeight: "500px", maxHeight: "500px", objectFit: "cover" }}
          />
        </Box>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight="bold"

          sx={{
            fontSize: isMobile ? "1.2rem" : "2.5rem",
            mb: 2
          }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{
            mb: 6, maxWidth: "600px", mx: "auto",
            fontSize: isMobile ? "0.9rem" : "1.1rem",
          }}
        >
          Everything you need to keep your business systems safe,
          secure, and running without interruption.
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link
                to={service.link ?? "/"}
                style={{ textDecoration: "none" }}
              >
                <Card

                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                    },
                  }}

                >
                  <CardContent sx={{ p: 3, textAlign: "center", height: "100%" }}>
                    <Box sx={{ mb: 2 }}>{service.icon}</Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: "transparent", py: 8 }}>
        <Container maxWidth="lg">
          <Grid spacing={6} alignItems="center">
            <Grid size={{
              xs: 12, md: 6
            }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: isMobile ? 2 : 4,
                  textAlign: "center",
                  fontSize: { xs: "1.2rem", md: "3rem", lg: "3.5rem" }
                }}
              >
                Why Choose Us ?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{
                mb: 4,
                fontSize: { xs: "0.9rem", md: "3rem", lg: "3.5rem" }

              }}>
                We focus on reliability, affordability, and fast response times
                so you never face IT challenges alone.
              </Typography>

              <List dense>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom
          sx={{
            fontWeight: "bold",
            mb: isMobile ? 2 : 4,
            textAlign: "center",
            fontSize: { xs: "1.2rem", md: "3rem", lg: "3.5rem" }
          }}
        >
          Ready for Expert IT Support?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 4, maxWidth: "600px", mx: "auto",
            fontSize: { xs: "0.9rem", md: "3rem", lg: "3.5rem" }
          }}
        >
          Don’t let IT issues slow you down. Get fast, professional help from our
          expert team today.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/itsupport/contact"
            startIcon={<PhoneIcon />}
            sx={{
              px: 4,
              py: 1.5,
              background:
                "linear-gradient(135deg, #D3D3D3 0%, #1e40af 100%)",
              fontSize: isMobile ? "0.9rem" : "1.1rem",
              minWidth: isMobile ? "200px" : "auto",
            }}
          >
            Contact Us Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/itsupport/itservices"
            startIcon={<BuildIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: isMobile ? "0.9rem" : "1.1rem",
              minWidth: isMobile ? "200px" : "auto",
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>
    </Box >
  );
}
