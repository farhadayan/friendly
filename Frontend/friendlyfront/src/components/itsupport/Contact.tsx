import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    GridLegacy as Grid,
    Card,
    CardContent,
    TextField,
    useTheme,
    Stack,
    Divider,
    Alert,
    IconButton,
    Snackbar,
    CircularProgress,
    Paper,
    Link,
    Chip,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Email,
    Phone,
    LocationOn,
    AccessTime,
    SupportAgent,
    ContentCopy,
    CheckCircle,
    WhatsApp,
    LinkedIn,
    Twitter,
    Facebook,
    Send,
    OpenInNew,
    Chat,
    Business,
    Person,
    Close,
} from '@mui/icons-material';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    category: string;
}

const Contact: React.FC = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const CONTACT_EMAIL = 'info@nordisksupport.com';
    const SUPPORT_EMAIL = 'support@nordisksupport.com';
    const SALES_EMAIL = 'sales@nordisksupport.com';
    const CAREERS_EMAIL = 'careers@nordisksupport.com';
    const PHONE_NUMBER = '+45 66 77 69 51';
    const WHATSAPP_NUMBER = '+4566776951';
    const ADDRESS = 'Copenhagen, Denmark';

    const contactCategories = [
        { value: 'general', label: 'General Inquiry', email: CONTACT_EMAIL },
        { value: 'support', label: 'Technical Support', email: SUPPORT_EMAIL },
        { value: 'sales', label: 'Sales & Business', email: SALES_EMAIL },
        { value: 'careers', label: 'Careers', email: CAREERS_EMAIL },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (category: string) => {
        setFormData(prev => ({
            ...prev,
            category
        }));
    };

    const getCurrentEmail = () => {
        const category = contactCategories.find(cat => cat.value === formData.category);
        return category ? category.email : CONTACT_EMAIL;
    };

    const generateEmailContent = () => {
        const { name, email, subject, message, category } = formData;
        const categoryLabel = contactCategories.find(cat => cat.value === category)?.label || 'General Inquiry';

        const emailSubject = subject
            ? `${subject} (${categoryLabel})`
            : `${categoryLabel} - ${name || 'Website Visitor'}`;

        const emailBody = `Dear Nordisk Support Team,

${message || 'I would like to get in touch with your team.'}

---
Contact Information:
Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}
Category: ${categoryLabel}
Submitted: ${new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
---
            
This message was sent via the contact form on nordisksupport.com.
            
Best regards,
${name || 'Website Visitor'}
${email ? `Email: ${email}` : ''}`.trim();

        return {
            subject: emailSubject,
            body: emailBody,
            toEmail: getCurrentEmail(),
            encodedSubject: encodeURIComponent(emailSubject),
            encodedBody: encodeURIComponent(emailBody),
            mailtoLink: `mailto:${getCurrentEmail()}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
        };
    };

    const openEmailClient = () => {
        const { mailtoLink } = generateEmailContent();

        // Method 1: Create a temporary form (most reliable for new tab)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = mailtoLink;
        form.target = '_blank';
        form.style.display = 'none';

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        return true;
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            setSnackbar({
                open: true,
                message: 'Please enter your message.',
                severity: 'error'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Open email client in new tab
            const success = openEmailClient();

            if (success) {
                setSnackbar({
                    open: true,
                    message: 'Opening email client in new tab...',
                    severity: 'info'
                });

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                        category: 'general',
                    });
                    setIsSubmitting(false);
                }, 1000);
            }
        } catch (error) {
            console.error('Error opening email client:', error);
            setSnackbar({
                open: true,
                message: 'Unable to open email client. Please try copying the email content.',
                severity: 'error'
            });
            setIsSubmitting(false);
        }
    };

    const copyEmailContent = () => {
        const { subject, body, toEmail } = generateEmailContent();
        const emailContent = `To: ${toEmail}
Subject: ${subject}

${body}`;

        navigator.clipboard.writeText(emailContent)
            .then(() => {
                setCopied(true);
                setSnackbar({
                    open: true,
                    message: 'Email content copied to clipboard!',
                    severity: 'success'
                });
                setTimeout(() => setCopied(false), 3000);
            })
            .catch(err => {
                setSnackbar({
                    open: true,
                    message: 'Failed to copy. Please try again.',
                    severity: 'error'
                });
            });
    };

    const openWhatsApp = () => {
        const message = `Hello Nordisk Support,\n\nI would like to get in touch regarding: ${formData.category}\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    const teamContacts = [
        {
            name: 'Customer Care',
            role: '',
            email: 'customercare@nordisksupport.com',
            phone: '+45 66 77 69 51',
            avatar: '/team/sarah.jpg',
        },
        {
            name: 'Sales Team',
            role: '',
            email: 'sales@nordisksupport.com',
            phone: '+45 66 77 69 51',
            avatar: '/team/mikael.jpg',
        },
        {
            name: 'Technical Team',
            role: '',
            email: 'techteam@nordisksupport.com',
            phone: '+45 66 77 69 51',
            avatar: '/team/emma.jpg',
        },
    ];



    return (
        <Box sx={{ overflow: 'hidden', background: "transparent" }}>
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
                        // p: { xs: 3, md: 4 },
                        backdropFilter: "blur(10px)",
                        background: "linear-gradient(90deg, transparent 0%, cadetblue 100%)",
                        height: { xs: 'auto', md: '350px' },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                        }}  >
                        Contact Us

                    </Typography>

                    <Typography
                        variant="h6"

                        sx={{

                            textAlign: "center",
                            justifyContent: "center",
                            opacity: 0.7,
                            lineHeight: 1.6,
                            pb:4
                        }}
                    >
                        Get in touch with our team. We love to hear from you.
                    </Typography>

                    <Box
                        sx={{
                            display: "inline-flex",
                            gap: 2,
                            justifyContent: "center",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            alignItems: "center",


                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Phone />}
                            sx={{
                                backgroundColor: 'white',
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                        >
                            Call Us: {PHONE_NUMBER}
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<WhatsApp />}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: '#25D366',
                                    backgroundColor: 'rgba(37, 211, 102, 0.1)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                            onClick={openWhatsApp}
                        >
                            WhatsApp Chat
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        display: { xs: "none", md: "flex" }
                    }}
                >
                    <img
                        src="/logos/contact.webp"
                        alt="IT Support Illustration"
                        style={{ width: "100%", height: "350px", objectFit: "cover" }}
                    />
                </Box>
            </Box>

            {/* <Box sx={{
                flex: 1,
                m: 0,
                p: 0,
                px: 0,
                py: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            flex: 1,
                            m: 0,
                            // p: { xs: 3, md: 4 },
                            backdropFilter: "blur(10px)",
                            background: "linear-gradient(90deg, transparent 0%, cadetblue 100%)",
                            height: 'auto',
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        
            <Box
                sx={{
                    flex: 1,
                    position: 'relative',
                    height: { xs: 300, md: 500 },
                    width: '100%',
                    borderRadius: { xs: 2, md: 0 },
                    overflow: 'hidden',
                    boxShadow: { xs: '0 4px 20px rgba(0,0,0,0.2)', md: 'none' },
                }}
            >
                <img
                    src="/logos/contact.webp"
                    alt="IT Support Illustration"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                    }}
                />
            </Box>

            
            <Box
                sx={{
                    flex: 1,
                    background: 'linear-gradient(90deg, transparent 0%, cadetblue 70%)',
                    py: { xs: 4, md: 6 },
                    px: { xs: 3, md: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: { xs: 'auto', md: 500 },
                    position: 'relative',
                }}
            >
                <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '3rem' },
                            fontWeight: 800,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        Contact Nordisk Support
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            opacity: 0.9,
                            fontWeight: 300,
                            maxWidth: 600,
                        }}
                    >
                        Get in touch with our team. We love to hear from you.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', md: 'flex-start' }
                    }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Phone />}
                            sx={{
                                backgroundColor: 'white',
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                        >
                            Call Us: {PHONE_NUMBER}
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<WhatsApp />}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: '#25D366',
                                    backgroundColor: 'rgba(37, 211, 102, 0.1)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                            onClick={openWhatsApp}
                        >
                            WhatsApp Chat
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
                </Container >
            </Box > 
            */}

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    {/* Left Column: Contact Info & Quick Actions */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={4}>
                            {/* Contact Card */}
                            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                                <Typography variant="h5" gutterBottom fontWeight={600} color="primary">
                                    Contact Information
                                </Typography>

                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Phone color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Phone"
                                            secondary={
                                                <Link href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}>
                                                    {PHONE_NUMBER}
                                                </Link>
                                            }
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon>
                                            <Email color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="General Email"
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Link href={`mailto:${CONTACT_EMAIL}`}>
                                                        {CONTACT_EMAIL}
                                                    </Link>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => navigator.clipboard.writeText(CONTACT_EMAIL)}
                                                    >
                                                        <ContentCopy fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            }
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Address"
                                            secondary={ADDRESS}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon>
                                            <AccessTime color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Business Hours"
                                            secondary={
                                                <>
                                                    24/7 Support Available
                                                    <br />
                                                    Mon-Fri: 8:00 AM - 6:00 PM
                                                </>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Paper>

                            {/* Quick Templates */}
                            {/* <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                    Quick Templatess
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    Pre-fill your message with a template:
                                </Typography>

                                <Stack spacing={2}>
                                    {quickTemplates.map((template, index) => (
                                        <Card
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    backgroundColor: 'action.hover'
                                                }
                                            }}
                                            onClick={() => applyTemplate(template)}
                                        >
                                            <CardContent sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                                                        {template.icon}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={600}>
                                                            {template.title}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Click to apply
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            </Paper> */}

                            {/* Team Contacts */}
                            <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>


                                <Stack spacing={2}>
                                    {teamContacts.map((person, index) => (
                                        <Box key={index}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                                {<Avatar
                                                    src={person.avatar}
                                                    sx={{ width: 40, height: 40 }}
                                                >
                                                    {person.name.charAt(0)}
                                                </Avatar>}
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {person.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {person.role}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ pl: 7 }}>
                                                <Typography variant="body2">
                                                    <Link href={`mailto:${person.email}`} sx={{ mr: 2 }}>
                                                        {person.email}
                                                    </Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Link href={`tel:${person.phone.replace(/\s/g, '')}`}>
                                                        {person.phone}
                                                    </Link>
                                                </Typography>
                                            </Box>
                                            {index < teamContacts.length - 1 && <Divider sx={{ my: 2 }} />}
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>

                    {/* Right Column: Contact Form */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3 }}>
                            <Typography variant="h4" gutterBottom fontWeight={700}>
                                Send Us a Message
                            </Typography>


                            <form onSubmit={handleEmailSubmit}>
                                <Stack spacing={2}>
                                    {/* Category Selection */}
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Select Category
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {contactCategories.map((category) => (
                                                <Chip
                                                    key={category.value}
                                                    label={category.label}
                                                    onClick={() => handleCategoryChange(category.value)}
                                                    color={formData.category === category.value ? "primary" : "default"}
                                                    variant={formData.category === category.value ? "filled" : "outlined"}
                                                    sx={{ mb: 1 }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Grid container >
                                        <Grid item sx={{ pr: 1 }} xs={8} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                variant="outlined"

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        fullWidth
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        variant="outlined"
                                    />

                                    <Box>
                                        <TextField
                                            fullWidth
                                            label="Your Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            placeholder="Please describe your inquiry in detail..."
                                            required
                                            InputProps={{
                                                sx: {
                                                    '& textarea': {
                                                        resize: 'vertical',
                                                        minHeight: '150px'
                                                    }
                                                }
                                            }}
                                        />
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                            {formData.message.length} characters
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                        pt: 2
                                    }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <OpenInNew />}
                                            disabled={isSubmitting || !formData.message.trim()}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 600,
                                                fontSize: '1.1rem',
                                                minWidth: 200
                                            }}
                                        >
                                            {isSubmitting ? 'Opening...' : 'Open Email Client'}
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            size="large"
                                            startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                                            onClick={copyEmailContent}
                                        >
                                            {copied ? 'Copied!' : 'Copy Content'}
                                        </Button>

                                        <Button
                                            variant="text"
                                            size="large"
                                            onClick={() => setPreviewOpen(true)}
                                        >
                                            Preview Email
                                        </Button>

                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                            Will open in new tab
                                        </Typography>
                                    </Box>

                                    <Alert severity="success" sx={{ mt: 2 }}>
                                        <Typography variant="body2">
                                            <strong>Tip:</strong> Your email client (Gmail, Outlook, Apple Mail, etc.) will open in a new tab or window.
                                            If nothing happens, check your pop-up blocker settings.
                                        </Typography>
                                    </Alert>
                                </Stack>
                            </form>

                            {/* Alternative Contact Methods */}
                            <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
                                <Typography variant="h6" gutterBottom>
                                    Alternative Contact Methods
                                </Typography>
                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                    <Button
                                        startIcon={<WhatsApp />}
                                        variant="outlined"
                                        onClick={openWhatsApp}
                                        sx={{
                                            borderColor: '#25D366',
                                            color: '#25D366',
                                            '&:hover': {
                                                borderColor: '#128C7E',
                                                backgroundColor: 'rgba(37, 211, 102, 0.1)'
                                            }
                                        }}
                                    >
                                        WhatsApp
                                    </Button>

                                    <Button
                                        startIcon={<LinkedIn />}
                                        variant="outlined"
                                        href="https://linkedin.com/company/nordisk-support"
                                        target="_blank"
                                    >
                                        LinkedIn
                                    </Button>

                                    <Button
                                        startIcon={<SupportAgent />}
                                        variant="outlined"
                                        href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                                    >
                                        Call Now
                                    </Button>

                                    <Button
                                        startIcon={<Email />}
                                        variant="outlined"
                                        href={`mailto:${CONTACT_EMAIL}`}
                                    >
                                        Direct Email
                                    </Button>
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Preview Dialog */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Email Preview</Typography>
                        <IconButton onClick={() => setPreviewOpen(false)} size="small">
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {(() => {
                        const { subject, body, toEmail } = generateEmailContent();
                        return (
                            <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="text.secondary">To:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{toEmail}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="text.secondary">Subject:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{subject}</Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ whiteSpace: 'pre-wrap', maxHeight: 400, overflow: 'auto', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                    {body}
                                </Box>
                            </Box>
                        );
                    })()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setPreviewOpen(false);
                            openEmailClient();
                        }}
                        startIcon={<Send />}
                    >
                        Open in Email Client
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box >
    );
};

export default Contact;