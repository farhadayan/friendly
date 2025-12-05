import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

export default function SwHome() {
  const services = [
    "Custom Web Application Development",
    "Android & iOS Mobile App Development",
    "Cloud Integration & Migration (Azure, AWS)",
    "Enterprise Software & Automation Tools",
    "UI/UX Design & Prototyping",
    "Software Maintenance & Support",
    "AI/ML Based Smart Applications",
  ];

  const whyChooseUs = [
    "Experienced full-stack developers",
    "100% custom and scalable solutions",
    "Faster delivery using agile methodology",
    "Clean and modern UI/UX",
    "Cloud-ready and secure architecture",
    "Affordable pricing for startups & enterprises",
  ];

  const facilities = [
    "Modern development lab with updated hardware",
    "Secure working environment for enterprise clients",
    "Cloud servers for testing & deployment",
    "Dedicated team for support and maintenance",
    "Collaboration tools (Jira, GitHub, Slack)",
  ];

  return (
    // <Box sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: { xs: 2, md: 4 }, py: 4 }}>

      
      {/* HERO SECTION */}
      <Card sx={{ mb: 4, p: 3, textAlign: 'center', background: "linear-gradient(45deg, cadetblue, #fff)" }}>
        <CardContent>
          <Typography variant="h3" component="h1" sx={{ mb: 2, color: '#1976d2' }}>
            Welcome to Digital Software Solutions
          </Typography>
          <Typography variant="h6">
            We help businesses transform ideas into powerful digital products using modern technology, 
            expert engineering, and scalable solutions.
          </Typography>
        </CardContent>
      </Card>

      {/* WHO WE ARE */}
      <Card sx={{ mb: 4, p: 3, background: "linear-gradient(45deg, cadetblue, #fff)" }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Who We Are
          </Typography>
          <Typography>
            Digital Software Solutions is a full-service software development company specializing in 
            building custom web applications, mobile apps, cloud-based platforms, enterprise dashboards, 
            automation tools, and digital transformation solutions.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            With a team of experienced developers, designers, and architects, we deliver secure, scalable, 
            and future-ready software solutions tailored to your business needs.
          </Typography>
        </CardContent>
      </Card>

      {/* CORE SERVICES */}
      <Card sx={{ mb: 4, p: 3, background: "linear-gradient(45deg, cadetblue, #fff)" }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Our Core Services
          </Typography>
          {services.map((service, index) => (
            <Typography key={index} sx={{ mb: 0.5 }}>• {service}</Typography>
          ))}
        </CardContent>
      </Card>

      {/* WHY CHOOSE US */}
      <Card sx={{ mb: 4, p: 3, background: "linear-gradient(45deg, cadetblue, #fff)" }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Why Choose Us?
          </Typography>
          {whyChooseUs.map((item, index) => (
            <Typography key={index} sx={{ mb: 0.5 }}>• {item}</Typography>
          ))}
        </CardContent>
      </Card>

      {/* TECHNOLOGIES */}
      <Card sx={{ mb: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Technologies We Work With
          </Typography>
          <Typography><strong>Frontend:</strong> React, Angular, Vue, Next.js</Typography>
          <Typography><strong>Backend:</strong> Node.js, Python Django, Java Spring Boot, .NET</Typography>
          <Typography><strong>Databases:</strong> MySQL, MS SQL, PostgreSQL, MongoDB</Typography>
          <Typography><strong>Cloud Platforms:</strong> Azure, AWS, Google Cloud</Typography>
          <Typography><strong>Mobile:</strong> React Native, Kotlin</Typography>
        </CardContent>
      </Card>

      {/* FACILITIES */}
      <Card sx={{ mb: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Our Facilities
          </Typography>
          {facilities.map((item, index) => (
            <Typography key={index} sx={{ mb: 0.5 }}>• {item}</Typography>
          ))}
        </CardContent>
      </Card>

      {/* CLIENT TESTIMONIAL */}
      <Card sx={{ mb: 4, p: 3, backgroundColor: '#f0f4ff', borderLeft: '5px solid #1976d2' }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            What Our Clients Say
          </Typography>
          <Typography>
            "Digital Software Solutions delivered our project exactly on time with great quality. 
            Their communication and expertise were outstanding."
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 'bold' }}>- CEO, TechNova Ltd</Typography>
        </CardContent>
      </Card>

      {/* CALL TO ACTION */}
      <Card sx={{ mb: 4, p: 3, textAlign: 'center', backgroundColor: '#1976d2', color: 'white' }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Let’s Build Something Great Together
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Need an app, website, or custom software solution? We’re here to help.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ backgroundColor: 'white', color: '#1976d2', fontWeight: 'bold' }}
            href="/software/contact"
          >
            Contact Us
          </Button>
        </CardContent>
      </Card>

    </Box>
  );
}
