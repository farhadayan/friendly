import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GuideHome: React.FC = () => {
  const services = [
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: "Personalized Counseling",
      text: "One-on-one sessions to choose the best-fit program for your goals.",
    },
    {
      icon: <TravelExploreIcon fontSize="large" color="primary" />,
      title: "University Admission Support",
      text: "Complete guidance for applying to top universities abroad.",
    },
    {
      icon: <GppGoodIcon fontSize="large" color="primary" />,
      title: "Visa Assistance",
      text: "Step-by-step help with visa documentation and interview preparation.",
    },
    {
      icon: <PeopleIcon fontSize="large" color="primary" />,
      title: "Pre-Departure Support",
      text: "Travel tips, accommodation help, and settling-in advice.",
    },
  ];

  const reasons = [
    "1000+ successful student placements",
    "Partnerships with top universities",
    "Transparent process with no hidden charges",
    "Fast response and personalized attention",
    "Multilingual guidance (English, Danish, Bengali)",
  ];

  const testimonials = [
    {
      name: "Rafi Ahmed",
      text: "Thanks to Student Admission Guidance, I got admission to VIA University College in Denmark. Their support made everything stress-free!",
    },
    {
      name: "Nadia Karim",
      text: "Professional and reliable service! I was guided from application to visa without any confusion.",
    },
  ];

  return (
    <Box sx={{ mt: 10, backgroundColor: "white", minHeight: "100vh", marginTop: "74px", marginLeft: '48px'  }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(45deg, cadetblue, #fff)",
          py: { xs: 6, md: 10 },
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 3,
        }}
      >
        <Container>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              color: "#1E3A8A" 
            }}
          >
            Shape Your Future with Expert Admission Guidance
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            From choosing the right university to securing your admission – we guide
            you every step of the way.
          </Typography>
          <Box 
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f1f5f9",
                color: "black",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#ccc" },
              }}
            >
              Explore Programs
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "#000",
                ml: 2,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Free Consultation
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 3, color: "#1E3A8A" }}
        >
          About Student Admission Guidance
        </Typography>
        <Typography
          align="center"
          sx={{ color: "#475569", maxWidth: 800, mx: "auto" }}
        >
          We specialize in helping international students achieve their dream of
          studying in top European countries like <b>Denmark</b>, <b>Germany</b>,
          and <b>Finland</b>. Our experts assist with course selection, document
          preparation, admission process, and pre-departure guidance — ensuring a
          smooth journey from start to finish.
        </Typography>
      </Container>

      {/* Services Section */}
      <Box sx={{ background: "linear-gradient(45deg, cadetblue, #fff)",
         py: 8, borderRadius: 3, mb: 8 }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 6, color: "#1E3A8A" }}
          >
            Our Key Services
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            spacing={3}
          >
            {services.map((service, i) => (
              <Box
                key={i}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 280,
                    textAlign: "center",
                    p: 2,
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.15)" },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{service.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 5, color: "#1E3A8A" }}
        >
          Why Choose Us?
        </Typography>

        <Stack
          spacing={2}
          alignItems="center"
          sx={{ maxWidth: 700, mx: "auto" }}
        >
          {reasons.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <CheckCircleIcon color="success" />
              <Typography>{item}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Testimonials */}
      <Box sx={{ backgroundColor: "#EFF6FF", py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 4, color: "#1E3A8A" }}
          >
            What Students Say
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
          >
            {testimonials.map((t, i) => (
              <Card
                key={i}
                sx={{
                  backgroundColor: "#ddd",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
                  flex: "1 1 45%",
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    “{t.text}”
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>{t.name[0]}</Avatar>
                    <Typography sx={{ fontWeight: "bold" }}>{t.name}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
         background: "linear-gradient(45deg, cadetblue, #fff)",
          color: "#1E3A8A",
          borderRadius: 3,
          mb: 8,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Ready to take the next step toward your dream university?
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            "&:hover": { backgroundColor: "#ccc" },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default GuideHome;
