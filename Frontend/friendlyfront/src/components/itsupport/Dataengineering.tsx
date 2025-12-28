// swservice.tsx

import React from "react";
import {
  Box,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";


import {
  CleaningServices as CleaningServicesIcon,
  CloudDownload as CloudDownloadIcon,
  FilterAlt as FilterIcon,
  Sync as SyncIcon,
  Transform as TransformIcon,
  SettingsEthernet as SettingsEthernetIcon,
  Warehouse as WarehouseIcon,
  Storage as StorageIcon,
  DataObject as DataObjectIcon,
  Tune as TuneIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  SwapHoriz as SwapHorizIcon,
  CompareArrows as CompareArrowsIcon,
  CheckCircle as CheckCircleIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

export default function Dataengineering() {
  const services = [
    {
      icon: <CloudDownloadIcon color="primary" fontSize="large" />,
      title: "Data Collection & Cleaning",
      desc: "We gather data from multiple sources (web, databases, apps, APIs) and clean it by removing errors, duplicates, and inconsistencies—ensuring you get accurate, analysis-ready data."
    },
    {
      icon: <SyncIcon color="primary" fontSize="large" />,
      title: "ETL/ELT Pipeline Development",
      desc: "We build scalable ETL/ELT pipelines that automatically collect, transform, and load your data into the required systems. This reduces manual work and keeps your data always up to date."
    },

    {
      icon: <DataObjectIcon color="primary" fontSize="large" />,
      title: "Database Design & Optimization",
      desc: "We create high-performance, scalable database architectures and improve existing databases through indexing, query optimization, and normalization—ensuring your applications run faster and more smoothly."
    },
    {
      icon: <AnalyticsIcon color="primary" fontSize="large" />,
      title: "Automated Reporting Systems",
      desc: "We develop automated dashboards and reporting systems using Power BI, Tableau, or custom solutions that provide real-time insights and support data-driven decision making."
    },
    {
      icon: <StorageIcon color="primary" fontSize="large" />,
      title: "Data Warehouse Setup",
      desc: "Organized storage systems for structured and easy-to-use business data."
    },
    {
      icon: <SwapHorizIcon color="primary" fontSize="large" />,
      title: "Business Data Migration",
      desc: "We securely migrate your data from old systems, servers, or platforms to new environments—ensuring minimal downtime and zero data loss for a smooth transition."
    }
  ];

  const benefits = [
    "Clean, high - quality data",
    "Scalable pipelines",
    "Optimized databases",
    "Presentation - ready reporting",
    "Support for modern tools"
  ];

  return (
    <Box sx={{ overflow: "hidden", background: "transparent" }}>
      <Box
        sx={{
          flex: 1,
          m: 0,
          p: { xs: 1, md: 2 },

          backdropFilter: "blur(10px)",
          background: `
            linear-gradient(90deg, #f8fafc 0%, transparent 25%),
            linear-gradient(270deg, #f8fafc 0%, transparent 25%),
            linear-gradient(180deg, cadetblue 0%, transparent 80%)
          `,
          height: { xs: "100px", md: "200px" },
          textAlign: "center",

        }}
      >
        <Container maxWidth="lg" sx={{ pb: 3 }}>
          <Typography variant="h2" sx={{ pb: { xs: 2 } }}>
            Data Engineering
          </Typography>
          <Typography variant="h6">
            Data is one of the most valuable assets a business owns - but only if it is structured, reliable
            and accessible. Our Data Engineering services help businesses collect, process, and transform data
            into a solid foundation for analytics, reporting, and decision-making. We design and build robust
            data pipelines that move data from multiple sources into centralized, secure and scalable data
            platforms. From data cleaning and transformation to data warehousing and cloud-based solutions,
            we ensure your data is accurate, consistent, and ready to use.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ pt: { xs: 32, md: 4 }, pb: { xs: 4 } }}>
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
                  <Typography variant="h5" sx={{ pb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" lineHeight={1.8}>
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
              <Typography variant="h3" >
                Our Data Service
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
                src="/logos/dataeng.png"
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

    </Box>
  );
}
