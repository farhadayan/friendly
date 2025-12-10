import React from "react";
import {
  Box,
  Container,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Computer as ComputerIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  Support as SupportIcon,
  NetworkCheck as NetworkIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ITSupport() {
  const services = [
    {
      icon: <ComputerIcon color="primary" fontSize="large" />,
      title: "Desktop & Laptop Support",
      description:
        "Comprehensive hardware and software support for desktops and laptops. Includes upgrades, virus removal, OS installation, and troubleshooting.",
    },
    {
      icon: <NetworkIcon color="primary" fontSize="large" />,
      title: "Network Solutions",
      description:
        "Wi-Fi setup, firewall configuration, VPNs, and troubleshooting for home and business networks.",
    },
    {
      icon: <CloudIcon color="primary" fontSize="large" />,
      title: "Cloud Services",
      description:
        "Migration to the cloud, cloud backups, Microsoft 365 and Google Workspace support, and ongoing cloud infrastructure management.",
    },

    {
      icon: <StorageIcon color="primary" fontSize="large" />,
      title: "Server Setup",
      description:
        "Server setup & configuration completed. Server ready for deployment. Server configured and operational."
    },
    {
      icon: <StorageIcon color="primary" fontSize="large" />,
      title: "Data Recovery",
      description:
        "Emergency recovery for hard drives, SSDs, USB drives, and cloud storage with a high success rate.",
    },
    {
      icon: <SupportIcon color="primary" fontSize="large" />,
      title: "24/7 IT Support",
      description:
        "Round-the-clock IT helpdesk for urgent issues. Remote and onsite support options available.",
    },
  ];

  const benefits = [
    "Skilled & experienced IT professionals",
    "Fast response times (average < 30 minutes)",
    "Affordable pricing with flexible plans",
    "Remote and onsite support availability",
    "Proactive monitoring and maintenance",
    "No long-term contracts required",
  ];

  const faqs = [
    {
      q: "Do you provide remote support?",
      a: "Yes! Most issues can be resolved remotely. If required, we also offer on-site visits.",
    },
    {
      q: "How fast is your emergency response?",
      a: "Our average response time is under 30 minutes, with 24/7 coverage for emergencies.",
    },
    {
      q: "Can you help with cloud migration?",
      a: "Absolutely. We handle migrations to Microsoft 365, Google Workspace, and other cloud providers.",
    },
    {
      q: "Do you work with small businesses?",
      a: "Yes, we specialize in providing cost-effective IT solutions for small to mid-sized businesses.",
    },
  ];

  return (
    <Box sx={{ overflow: "hidden", background: "transparent" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `
            linear-gradient(90deg, #f8fafc 0%, transparent 25%),
            linear-gradient(270deg, #f8fafc 0%, transparent 25%),
            linear-gradient(180deg, cadetblue 0%, transparent 80%)
          `,

          backdropFilter: "blur(10px)",
          py: { xs: 2, md: 6 },
          textAlign: "center",
        }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2, fontSize: { xs: "2.2rem", md: "2.5rem" } }}
          >
            IT Help Desk
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: "800px", mx: "auto", opacity: 0.9 }}
          >
            Reliable, affordable, and IT support for businesses. From device repairs to advanced maintenance, we’ve got
            you covered 24/7.
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
          Our Services
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: "700px", mx: "auto" }}
        >
          Explore our comprehensive IT solutions designed to keep your
          technology running smoothly.
        </Typography> */}

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-6px)", boxShadow: 4 },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
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
                Why Choose Us
              </Typography>

              <List dense>
                {benefits.map((benefit, index) => (
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
                src="/logos/ithelp1.jpg"
                alt="Make us diff"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, transparent 0%, cadetblue 50%)"
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: "800px", mx: "auto", mt: 4 }}>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      {/* <Box sx={{ background: "linear-gradient(135deg, #D3D3D3 0%, #1e40af 100%)", color: "white", py: 8, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Get Expert IT Support?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, maxWidth: "600px", mx: "auto" }}
          >
            Contact us today for a free consultation and let’s resolve your IT
            issues quickly and effectively.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/contact"
            startIcon={<BuildIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              backgroundColor: "white",
              color: "#1e40af",
              "&:hover": { backgroundColor: "#f8fafc" },
            }}
          >
            Contact Us Now
          </Button>
        </Container>
      </Box> */}
    </Box>
  );
}
