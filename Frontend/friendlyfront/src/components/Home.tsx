import React from "react";
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Computer as ComputerIcon,
  Phone as PhoneIcon,
  Rocket as RocketIcon,
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
      title: "Desktop & Laptop Support",
      description:
        "Hardware repairs, OS installation, virus removal, and performance optimization for all devices.",
    },
    {
      icon: <NetworkIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Network Solutions",
      description:
        "Wi-Fi setup, troubleshooting, firewall configuration, and VPN support for secure connectivity.",
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Cloud Services",
      description:
        "Cloud migration, Microsoft 365, Google Workspace, and secure online backups.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Cybersecurity",
      description:
        "Antivirus, firewalls, endpoint protection, and real-time threat monitoring.",
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Data Recovery",
      description:
        "Emergency recovery for hard drives, SSDs, and cloud storage.",
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "24/7 IT Support",
      description:
        "Always-on helpdesk for urgent issues. Remote and onsite support available.",
    },
  ];

  const features = [
    "Certified IT specialists with years of experience",
    "Lightning-fast response times (average under 15 minutes)",
    "Affordable pricing, no hidden fees",
    "Remote and onsite support availability",
    "Proactive monitoring & maintenance",
    "No long-term contracts required",
  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #fff 0%, #1e40af 100%)",
          color: "white",
          py: { xs: 6, md: 12 },
          textAlign: "center",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
            }}
          >
            Reliable IT Support{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Anytime You Need It
            </Box>
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              opacity: 0.9,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              lineHeight: 1.6,
            }}
          >
            From home users to growing businesses, we provide fast, affordable,
            and professional IT support. Available 24/7 to keep your technology
            running smoothly.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/contact"
              sx={{
                backgroundColor: "white",
                color: "#1e40af",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                minWidth: isMobile ? "200px" : "auto",
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
              to="/services/itsupport"
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                minWidth: isMobile ? "200px" : "auto",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Explore Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          IT Support Services
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: "600px", mx: "auto" }}
        >
          Everything you need to keep your business and home systems safe,
          secure, and running without interruption.
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid key={index} size= {{xs:12, sm:6, md:4}}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
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
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Grid spacing={6} alignItems="center">
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Why Choose Us for IT Support?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
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

              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/about"
                startIcon={<RocketIcon />}
                sx={{ mt: 2, px: 4, py: 1.5 }}
              >
                Learn More About Us
              </Button>
            </Grid>

            <Grid size={{xs:12, md:6}}>
              <Paper
                sx={{
                  p: 4,
                  background:
                    "linear-gradient(135deg, #ccc 0%, #1e40af 100%)",
                  color: "white",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Emergency IT Help
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  Facing downtime or a critical IT issue? Our emergency hotline
                  connects you directly with certified experts.
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <PhoneIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Call Now
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      (555) 123-HELP
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label="24/7 Emergency Line"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Ready for Expert IT Support?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          Don’t let IT issues slow you down. Get fast, professional help from our
          certified team today.
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
            to="/contact"
            startIcon={<PhoneIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              minWidth: isMobile ? "200px" : "auto",
            }}
          >
            Contact Us Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/services/itsupport"
            startIcon={<BuildIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              minWidth: isMobile ? "200px" : "auto",
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
