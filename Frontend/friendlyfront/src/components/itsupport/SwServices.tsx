//swservice.tsx

import React from "react";
import {
  Box, Typography, GridLegacy as Grid, CardContent, Container, Card, List, ListItem, ListItemText, ListItemIcon,

} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  CloudDownload as CloudDownloadIcon,
  CheckCircle as CheckCircleIcon,

} from "@mui/icons-material";


export default function SwServices() {
  const services = [
    {
      icon: <LanguageIcon color="primary" fontSize="large" />,
      title: "Web Development",
      desc: "Modern responsive websites & apps."
    },
    {
      icon: <PhoneIphoneIcon color="primary" fontSize="large" />,
      title: "Mobile Apps",
      desc: "iOS and Android solutions tailored to your needs."
    },
    {
      icon: <CloudDownloadIcon color="primary" fontSize="large" />,
      title: "Cloud Solutions",
      desc: "Scalable cloud-based systems & migrations."
    },
    {
      icon: <PsychologyIcon color="primary" fontSize="large" />,
      title: "Software Consulting",
      desc: "Strategy, architecture & tech guidance."
    },
  ];

  const benefits = [
    "Tailored solutions built around your business needs",
    "Data-driven decision making with smart software",
    "Scalable architectures designed for long-term growth",
    "Expert guidance from planning to deployment",
    "Secure, reliable and high-performance systems",
    "Transparent communication and on-time delivery"
  ]

  return (
    <Box sx={{ overflow: "hidden", background: "transparent" }}>

      <Box
        sx={{
          background: `
                linear-gradient(90deg, #f8fafc 0%, transparent 25%),
                linear-gradient(270deg, #f8fafc 0%, transparent 25%),
                linear-gradient(180deg, cadetblue 0%, transparent 80%)
              `,

          backdropFilter: "blur(10px)",
          py: { xs: 1, md: 4 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2">
            Software Solutions
          </Typography>
          <Typography variant="h6">
            At Nordic Support, we design and develop software solutions that turn data into 
            actionable insights. We help businesses streamline processes, improve efficiency, 
            and make informed decisions by building reliable, scalable, and secure digital systems 
            tailored to their needs.
          </Typography>
        </Container>
      </Box>
      <Container>
        <Grid container spacing={4}>
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
                  <Box sx={{ mb: { xs: 1, md: 2 } }}>{service.icon}</Box>
                  <Typography variant="h5">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: "transparent", py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",

          }}>

            {/* Left side: Text */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: { xs: 1, md: 4 } }}>
                Why Choose Us
              </Typography>

              <List dense>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0 }}>
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
                src="/logos/software1.jpg"
                alt="Make us diff"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  borderRadius: "12px",
                  //background: "linear-gradient(90deg, transparent 0%, cadetblue 100%)"
                }}
              />
            </Box>

          </Box>
        </Container>
      </Box>
    </Box>
  );
}
