import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    GridLegacy as Grid,
    Card,
    CardContent,
    Chip,
    useTheme,

    Accordion,
    AccordionSummary,
    AccordionDetails,

    Tooltip,
} from '@mui/material';
import SimpleEmailApplyButton from './SimpleEmailApplyButton';
import {
    Email,
    LinkedIn,
    LocationOn,
    Schedule,
    Work,
    ExpandMore,
    CheckCircle,
    Phone,
    Language,

} from '@mui/icons-material';

interface JobPosition {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    closingDate: string;
    salary: string;
    remote: boolean;
    urgent: boolean;
}

const gdprDialog = (
    <div style={{ maxWidth: 320 }}>
        <Typography variant="subtitle2" gutterBottom>
            Candidate Privacy Notice (GDPR)
        </Typography>

        <Typography variant="body2" paragraph>
            Nordisk Support processes your personal data solely for recruitment and
            hiring purposes.
        </Typography>

        <Typography variant="body2" paragraph>
            Your data will be reviewed by our hiring team and retained for a maximum of
            12 months.
        </Typography>

        <Typography variant="body2">
            You may request access, correction, or deletion of your data at any time by
            contacting:{' '}
            <strong>data-privacy@nordisksupport.com</strong>
        </Typography>
    </div>
)




const Career: React.FC = () => {
    const theme = useTheme();
    const HR_EMAIL = 'careers@nordisksupport.com';
    const HR_PHONE = '+45 66 77 69 51';

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Open until filled';

        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Closed';
        if (diffDays === 0) return 'Closes today';
        if (diffDays === 1) return 'Closes tomorrow';
        if (diffDays <= 7) return `Closes in ${diffDays} days`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const jobOpenings: JobPosition[] = [
        {
            id: 1,
            title: "Full Stack Developer",
            department: "Software",
            location: "Copenhagen, Denmark",
            type: "Full-time",
            description: "Join our software developer team to build scalable web applications using React, Node.js, and cloud technologies. You'll work on cutting-edge projects and collaborate with a talented team.",
            responsibilities: [
                "Design and develop responsive web applications",
                "Collaborate with cross-functional teams",
                "Implement and maintain CI/CD pipelines",
                "Write clean, maintainable code and conduct code reviews"
            ],
            requirements: [
                "5+ years of experience with React, TypeScript, Python and Node.js",
                "REST & GraphQL APIs, Knowledge on JWT, OAuth2, SSO",
                "Experience with AWS or Azure cloud services",
                "Strong problem-solving and communication skills"
            ],
            closingDate: "2026-02-01",
            salary: "Competitive",
            remote: true,
            urgent: true
        },
        {
            id: 2,
            title: "IT Support Specialist",
            department: "Support",
            location: "Onsite",
            type: "Contract",
            description: "Provide technical support and troubleshooting for our clients' IT infrastructure. Be the first point of contact for technical issues.",
            responsibilities: [
                "Handle tier 2/3 support tickets",
                "Maintain and configure IT systems",
                "Document technical procedures",
                "Assist with IT projects and deployments"
            ],
            requirements: [
                "3+ years in IT support or related field",
                "Knowledge of Windows/Linux servers",
                "Networking fundamentals",
                "Excellent communication skills"
            ],
            closingDate: "2026-02-01",
            salary: "Competitive",
            remote: true,
            urgent: false
        },
        {
            id: 3,
            title: "DevOps Engineer",
            department: "Engineering",
            location: "Hybrid",
            type: "Full-time",
            description: "Optimize our deployment processes and infrastructure automation. Build and maintain our cloud infrastructure.",
            responsibilities: [
                "Manage cloud infrastructure (AWS/Azure)",
                "Implement monitoring and alerting systems",
                "Automate deployment processes",
                "Ensure system security and compliance"
            ],
            requirements: [
                "Experience with Docker and Kubernetes",
                "Infrastructure as Code (Terraform)",
                "CI/CD pipeline development",
                "3+ years in DevOps role"
            ],
            closingDate: "2026-02-01",
            salary: "Competitive",
            remote: false,
            urgent: true
        },
        {
            id: 4,
            title: "UX/UI Designer",
            department: "Software",
            location: "Remote",
            type: "Part-time",
            description: "Create beautiful and functional user interfaces for our products. Work closely with development team and stakeholders.",
            responsibilities: [
                "Design user interfaces and experiences",
                "Create prototypes and wireframes",
                "Collaborate with development team",
                "Conduct user research and testing"
            ],
            requirements: [
                "Portfolio of design work",
                "Experience with Figma/Sketch",
                "Understanding of user-centered design",
                "2+ years in UI/UX design"
            ],
            closingDate: "2026-02-01",
            salary: "Negotiable",
            remote: true,
            urgent: false
        }
    ];

    const benefits = [
        "Competitive salary",
        "Flexible working hours",
        "Professional development budget",
        "Latest tech equipment",
        "Team building activities",
        "Generous vacation policy",
        "Parental leave benefits"
    ];

    const hiringProcess = [
        {
            step: 1,
            title: "Email Application",
            description: "Send your application via email with resume and cover letter"
        },
        {
            step: 2,
            title: "Initial Review",
            description: "HR team reviews your application within 3-5 business days"
        },
        {
            step: 3,
            title: "Interview",
            description: "Technical and cultural fit interviews with team members"
        },
        {
            step: 4,
            title: "Assessment",
            description: "Practical assessment or case study (if applicable)"
        },
        {
            step: 5,
            title: "Offer",
            description: "Receive and discuss your offer package"
        }
    ];


    return (
        <Box sx={{ width: '100%', pl: 0 }}>
            {/* Hero Section */}
            <Box sx={{
                background: `            
                linear-gradient(45deg, transparent 45%, #ddd 51%),
                linear-gradient(182deg, cadetblue 45%, transparent 50%),
                linear-gradient(220deg, cadetblue 45%, #ddd 100%)
                `,
                color: 'white',
                py: { xs: 4, md: 6 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ color: "black", pb: 1 }}>
                        Join Our Team
                    </Typography>
                    <Typography variant="h6" sx={{ color: "black", textAlign: 'justify', pl: 2 }}>
                        Build your career with a team that values innovation, collaboration, and growth. Nordisk Support is
                        an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive
                        environment for all employees.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        mt: 4
                    }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Email />}
                            sx={{ whiteSpace: 'nowrap' }}
                            onClick={() => {
                                const mailto = `mailto:${HR_EMAIL}?subject=General Application - Nordisk Support`;
                                window.open(mailto, '_blank');
                            }}
                        >
                            Send Application
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: 'transparent',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                                color: '#2c3e50',
                                border: '1px solid cadetblue',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => {
                                document.getElementById('open-positions')?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            View Open Positions
                        </Button>
                    </Box>
                </Container>

            </Box>

            <Box
                sx={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    display: { xs: "none", md: "flex" }
                }}>
                <img
                    src="/logos/careerimage.webp"
                    alt="IT Support"
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
            </Box>


            {/* Open Positions */}
            <Box id="open-positions" sx={{ py: 2, backgroundColor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: 'center',
                            mb: 2,
                            color: theme.palette.primary.main
                        }}
                    >
                        Open Positions
                    </Typography>


                    {jobOpenings.length === 0 ? (
                        <Card sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                No Current Openings
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                We're not hiring at the moment, but feel free to send us your resume for future opportunities.
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Email />}
                                onClick={() => {
                                    window.location.href = `mailto:${HR_EMAIL}?subject=Future Opportunity Interest`;
                                }}
                                sx={{ mt: 2 }}
                            >
                                Email Your Resume
                            </Button>
                        </Card>
                    ) : (
                        <Grid container spacing={3}>
                            {jobOpenings.map((job) => (
                                <Grid item xs={12} key={job.id}>
                                    <Card sx={{
                                        borderRadius: 3,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        '&:hover': {
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                            transform: 'translateY(-4px)',
                                            transition: 'all 0.3s ease'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Grid container spacing={3} alignItems="center">
                                                {/* Job Title & Department */}
                                                <Grid item xs={12} md={5}>
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                            {job.title}
                                                        </Typography>
                                                        {job.urgent && (
                                                            <Chip
                                                                label="Urgent"
                                                                color="error"
                                                                size="small"
                                                                sx={{ fontWeight: 600 }}
                                                            />
                                                        )}
                                                    </Box>
                                                    <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                                                        {job.department}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                        {job.description}
                                                    </Typography>
                                                </Grid>

                                                {/* Job Details */}
                                                <Grid item xs={12} md={4}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <LocationOn fontSize="small" color="action" />
                                                            <Typography variant="body2">
                                                                {job.location}
                                                                {job.remote && " (Remote Available)"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Work fontSize="small" color="action" />
                                                            <Typography variant="body2">
                                                                {job.type}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Schedule fontSize="small" color="action" />
                                                            <Typography variant="body2" sx={{ fontWeight: job.urgent ? 600 : 400 }}>
                                                                {formatDate(job.closingDate)}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                                                            Salary: {job.salary}
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                {/* Apply Button */}
                                                <Grid item xs={12} md={3}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: 2
                                                    }}>
                                                        <SimpleEmailApplyButton
                                                            jobTitle={job.title}
                                                            jobId={job.id}
                                                            department={job.department}
                                                            location={job.location}
                                                            jobType={job.type}
                                                            variant="contained"
                                                            size="large"
                                                            fullWidth
                                                        />

                                                        <Accordion sx={{ width: '100%', boxShadow: 'none' }}>
                                                            <AccordionSummary expandIcon={<ExpandMore />}>
                                                                <Typography variant="caption">View Details</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{ pt: 0 }}>
                                                                <Box sx={{ mt: 1 }}>
                                                                    <Typography variant="subtitle2" gutterBottom>
                                                                        Responsibilities:
                                                                    </Typography>
                                                                    <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                                                                        {job.responsibilities.map((item, idx) => (
                                                                            <li key={idx}>
                                                                                <Typography variant="body2">{item}</Typography>
                                                                            </li>
                                                                        ))}
                                                                    </ul>

                                                                    <Typography variant="subtitle2" gutterBottom>
                                                                        Requirements:
                                                                    </Typography>
                                                                    <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                                                                        {job.requirements.map((item, idx) => (
                                                                            <li key={idx}>
                                                                                <Typography variant="body2">{item}</Typography>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </Box>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* General Application CTA */}
                    <Box sx={{
                        textAlign: 'center',
                        mt: 8,
                        p: 6,
                        backgroundColor: 'white',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Don't See a Perfect Match?
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ mb: 4 }}>
                            We're always looking for talented individuals. Send us your resume for future opportunities.
                            <Tooltip
                                title={gdprDialog}
                                placement='right'
                                arrow >
                                <span>
                                    <Button size="small" variant="text" >
                                        Read Data Agreement
                                    </Button>
                                </span>
                            </Tooltip>
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<Email />}
                                sx={{ whiteSpace: 'nowrap' }}
                                onClick={() => {
                                    const mailto = `mailto:${HR_EMAIL}?subject=General Application - Nordisk Support`;
                                    window.open(mailto, '_blank');
                                }}
                            >
                                Submit Resume
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ whiteSpace: 'nowrap' }}
                                onClick={() => {
                                    navigator.clipboard.writeText(HR_EMAIL);
                                    alert(`Email address copied: ${HR_EMAIL}`);
                                }}
                            >
                                Copy Email Address
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Hiring Process */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
                    Our Hiring Process
                </Typography>

                <Grid container spacing={4}>
                    {hiringProcess.map((step, index) => (
                        <Grid item xs={12} sm={6} md={2.4} key={step.step}>
                            <Box sx={{
                                textAlign: 'center',
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    mb: 3,
                                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
                                }}>
                                    {step.step}
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {step.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </Box>
    );
};

export default Career;