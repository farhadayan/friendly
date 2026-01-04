import React, { useState, useEffect } from 'react';
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
    Checkbox,
    FormControlLabel,
    Modal,
    Backdrop,
    Fade,
    Tooltip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
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
    ExpandMore,
    PrivacyTip,
    Flag,
} from '@mui/icons-material';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    phoneCountryCode: string;
    subject: string;
    message: string;
    category: string;
}

interface GDPRConsent {
    accepted: boolean;
    timestamp: Date | null;
}

interface CountryCode {
    code: string;
    name: string;
    pattern: RegExp;
    placeholder: string;
}

const Contact: React.FC = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        phoneCountryCode: '+45',
        subject: '',
        message: '',
        category: 'general',
    });
    const [phoneError, setPhoneError] = useState<string>('');
    const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
    const [formattedPhone, setFormattedPhone] = useState<string>('');

    const [gdprConsent, setGdprConsent] = useState<GDPRConsent>({
        accepted: false,
        timestamp: null,
    });
    const [gdprModalOpen, setGdprModalOpen] = useState(false);
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

    // Country codes with validation patterns
    const countryCodes: CountryCode[] = [
        {
            code: '+45',
            name: 'Denmark',
            pattern: /^(\+45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
            placeholder: '12 34 56 78'
        },
        {
            code: '+46',
            name: 'Sweden',
            pattern: /^(\+46)?\s?\d{1,3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
            placeholder: '70 123 45 67'
        },
        {
            code: '+47',
            name: 'Norway',
            pattern: /^(\+47)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
            placeholder: '90 12 34 56'
        },
        {
            code: '+358',
            name: 'Finland',
            pattern: /^(\+358)?\s?\d{1,2}\s?\d{3}\s?\d{3,4}$/,
            placeholder: '40 123 4567'
        },
        {
            code: '+49',
            name: 'Germany',
            pattern: /^(\+49)?\s?\d{3,4}\s?\d{4,12}$/,
            placeholder: '151 23456789'
        },
        {
            code: '+44',
            name: 'UK',
            pattern: /^(\+44)?\s?\d{4}\s?\d{3}\s?\d{3}$/,
            placeholder: '7911 123456'
        },
        {
            code: '+1',
            name: 'USA/Canada',
            pattern: /^(\+1)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            placeholder: '(555) 123-4567'
        },
    ];

    const contactCategories = [
        { value: 'general', label: 'General Inquiry', email: CONTACT_EMAIL },
        { value: 'support', label: 'Technical Support', email: SUPPORT_EMAIL },
        { value: 'sales', label: 'Sales & Business', email: SALES_EMAIL },
        { value: 'careers', label: 'Careers', email: CAREERS_EMAIL },
    ];

    // Phone number formatting function
    const formatPhoneNumber = (value: string, countryCode: string = '+45'): string => {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');

        // Get current country's formatting rules
        const country = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

        // Format based on country
        switch (countryCode) {
            case '+45': // Denmark: +45 12 34 56 78
                if (cleaned.length <= 2) return cleaned;
                if (cleaned.length <= 4) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
                if (cleaned.length <= 6) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
                if (cleaned.length <= 8) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
                return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)}`;

            case '+46': // Sweden: +46 70 123 45 67
                if (cleaned.length <= 2) return cleaned;
                if (cleaned.length <= 3) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
                if (cleaned.length <= 6) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
                if (cleaned.length <= 8) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
                return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;

            case '+47': // Norway: +47 90 12 34 56
                if (cleaned.length <= 2) return cleaned;
                if (cleaned.length <= 4) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
                if (cleaned.length <= 6) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
                if (cleaned.length <= 8) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
                return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)}`;

            case '+1': // US/Canada: +1 (555) 123-4567
                if (cleaned.length <= 3) return cleaned;
                if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
                return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;

            default:
                // Generic formatting for other countries
                if (cleaned.length <= 3) return cleaned;
                if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
                if (cleaned.length <= 9) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
                return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)}`;
        }
    };

    // Phone number validation
    const validatePhoneNumber = (phone: string, countryCode: string): { isValid: boolean; message: string; formatted: string } => {
        if (!phone) {
            return { isValid: true, message: '', formatted: '' };
        }

        // Clean the phone number for validation
        const cleanedPhone = phone.replace(/\D/g, '');
        const country = countryCodes.find(c => c.code === countryCode);

        if (!country) {
            return { isValid: false, message: 'Invalid country code', formatted: phone };
        }

        // Add country code for validation if not present
        const fullNumber = countryCode + cleanedPhone;
        const pattern = country.pattern;

        // Test against pattern
        const isValid = pattern.test(countryCode + ' ' + phone) || pattern.test(phone);

        if (!isValid) {
            let message = '';
            switch (countryCode) {
                case '+45':
                    message = 'Danish number must be 8 digits (e.g., 12 34 56 78)';
                    break;
                case '+46':
                    message = 'Swedish number format: 70 123 45 67';
                    break;
                case '+47':
                    message = 'Norwegian number must be 8 digits (e.g., 90 12 34 56)';
                    break;
                default:
                    message = `Please enter a valid ${country.name} phone number`;
            }
            return { isValid: false, message, formatted: phone };
        }

        // Format the phone number
        const formatted = formatPhoneNumber(cleanedPhone, countryCode);
        return { isValid: true, message: '', formatted };
    };

    // Handle phone number change with formatting
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const validation = validatePhoneNumber(value, formData.phoneCountryCode);

        setFormData(prev => ({
            ...prev,
            phone: value
        }));

        setFormattedPhone(validation.formatted);
        setIsValidPhone(validation.isValid);
        setPhoneError(validation.message);
    };

    // Handle country code change
    const handleCountryCodeChange = (code: string) => {
        setFormData(prev => ({
            ...prev,
            phoneCountryCode: code,
            phone: '' // Clear phone when country changes
        }));
        setFormattedPhone('');
        setPhoneError('');
        setIsValidPhone(true);
    };

    // Handle GDPR Checkbox Change
    const handleGdprConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isAccepted = event.target.checked;
        setGdprConsent({
            accepted: isAccepted,
            timestamp: isAccepted ? new Date() : null
        });

        // Show snackbar when consent is given
        if (isAccepted) {
            setSnackbar({
                open: true,
                message: 'Thank you for accepting our privacy terms.',
                severity: 'success'
            });
        }
    };

    // Open GDPR Modal
    const openGdprModal = () => {
        setGdprModalOpen(true);
    };

    // Close GDPR Modal
    const closeGdprModal = () => {
        setGdprModalOpen(false);
    };

    // Handle form change
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
        const { name, email, phone, phoneCountryCode, subject, message, category } = formData;
        const categoryLabel = contactCategories.find(cat => cat.value === category)?.label || 'General Inquiry';
        const gdprStatus = gdprConsent.accepted ?
            `GDPR Consent: Accepted on ${gdprConsent.timestamp?.toLocaleString('en-GB')}` :
            'GDPR Consent: Not accepted';

        // Format phone for email
        const displayPhone = phone ? `${phoneCountryCode} ${phone}` : 'Not provided';

        const emailSubject = subject
            ? `${subject} (${categoryLabel})`
            : `${categoryLabel} - ${name || 'Website Visitor'}`;

        const emailBody = `Dear Nordisk Support Team,

${message || 'I would like to get in touch with your team.'}

---
Contact Information:
Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${displayPhone}
Country Code: ${phoneCountryCode}
Category: ${categoryLabel}
${gdprStatus}
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
${email ? `Email: ${email}` : ''}
${phone ? `Phone: ${displayPhone}` : ''}`.trim();

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

        // Create a temporary form (most reliable for new tab)
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

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check GDPR consent
        if (!gdprConsent.accepted) {
            setSnackbar({
                open: true,
                message: 'Please accept the GDPR agreement to continue.',
                severity: 'error'
            });
            return;
        }

        // Validate phone if provided
        if (formData.phone && !isValidPhone) {
            setSnackbar({
                open: true,
                message: 'Please enter a valid phone number.',
                severity: 'error'
            });
            return;
        }

        if (!formData.message.trim()) {
            setSnackbar({
                open: true,
                message: 'Please enter your message.',
                severity: 'error'
            });
            return;
        }

        if (formData.email && !isValidEmail(formData.email)) {
            setSnackbar({
                open: true,
                message: 'Please enter a valid email address.',
                severity: 'error'
            });
            return;
        }

        setIsSubmitting(true);

        try {
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
                        phone: '',
                        phoneCountryCode: '',
                        subject: '',
                        message: '',
                        category: 'general',
                    });
                    setGdprConsent({
                        accepted: false,
                        timestamp: null
                    });
                    setFormattedPhone('');
                    setPhoneError('');
                    setIsValidPhone(true);
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
        const message = `Hello Nordisk Support,\n\nI would like to get in touch regarding: ${formData.category}\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nPhone: ${formData.phoneCountryCode} ${formData.phone || 'Not provided'}\nGDPR Consent: ${gdprConsent.accepted ? 'Accepted' : 'Not accepted'}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    // Get current country placeholder
    const getPhonePlaceholder = () => {
        const country = countryCodes.find(c => c.code === formData.phoneCountryCode);
        return country ? country.placeholder : '12 34 56 78';
    };

    // Get current country flag
    const getCountryFlag = () => {
        const country = countryCodes.find(c => c.code === formData.phoneCountryCode);
        return country ? country.code : '🇩🇰';
    };

    // GDPR Modal Styles
    const gdprModalStyle = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 900,
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const,
    };

    const contentStyle = {
        overflowY: 'auto' as const,
        maxHeight: 'calc(90vh - 140px)',
        p: 3,
    };

    // GDPR Agreement Content
    const gdprContent = `
    1. Introduction
    The IT support services provided by Nordisk Support involve the collection of personal data. This agreement explains how we collect, process, and protect your personal data in compliance with the EU General Data Protection Regulation (GDPR).

    2. Data Controller
    The data controller is:
    Nordisk Support
    Copenhagen, Denmark
    Email: data-privacy@nordisksupport.com

    3. Types of Data Collected
    - Contact information (name, email, phone)
    - Business information (company name, position)
    - Technical data (IP address, browser information)
    - Communication content (your messages to us)

    4. Purposes of Processing
    We process your data to:
    - Respond to your inquiries and provide requested services
    - Manage our business relationship
    - Send relevant information about our services
    - Comply with legal obligations

    5. Legal Basis
    Processing is based on:
    - Your explicit consent (for marketing communications)
    - Performance of a contract (when providing services)
    - Legitimate interests (for business communications)

    6. Data Retention
    We retain personal data only as long as necessary for the purposes outlined above, or as required by law.

    7. Your Rights
    Under GDPR, you have the right to:
    - Access your personal data
    - Rectify inaccurate data
    - Request erasure of your data
    - Restrict processing
    - Object to processing
    - Data portability

    8. Data Security
    We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.

    9. Data Transfers
    Your data may be transferred to and processed in countries outside the EU/EEA. We ensure such transfers are protected by appropriate safeguards.

    10. Contact
    For privacy-related questions, contact: data-privacy@nordisksupport.com
    `;

    // Auto-format phone number on country code change
    useEffect(() => {
        if (formData.phone) {
            const validation = validatePhoneNumber(formData.phone, formData.phoneCountryCode);
            setFormattedPhone(validation.formatted);
            setIsValidPhone(validation.isValid);
            setPhoneError(validation.message);
        }
    }, [formData.phoneCountryCode]);

    return (
        <Box sx={{ overflow: 'hidden', background: "transparent", pl: 0 }}>
            {/* Hero Section - Same as before */}
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
                        variant="h2"
                        sx={{ textAlign: "center" }} >
                        Contact Us
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            justifyContent: "center",
                            opacity: 0.7,
                            lineHeight: 1.6,
                            pb: 4
                        }}
                    >
                        Get in touch with our team. We love to hear you.
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
                            {PHONE_NUMBER}
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

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    {/* Left Column: Contact Info */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={4}>
                            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                                <Typography variant="h5" textAlign={'center'} >
                                    Contact Information
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            secondary={<>
                                                Mon–Fri: 8:30 – 17:30
                                                <br />
                                                Sat–Sun: 10:00–15:00
                                            </>}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                            <Phone color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            secondary={
                                                <Link
                                                    href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    {PHONE_NUMBER}
                                                </Link>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                            <LocationOn color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            secondary={ADDRESS}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                            <AccessTime color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            secondary="24/7 Support Available"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>

                            <Paper elevation={1} >
                                <Box
                                    sx={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: { xs: "none", md: "flex" }
                                    }}
                                >
                                    <img
                                        src="/logos/chatmodel.png"
                                        alt="IT Support Illustration"
                                        style={{ width: "100%", height: "500px", objectFit: "cover" }}
                                    />
                                </Box>
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
                                            Select Team
                                        </Typography>
                                        <Stack direction={{ xs: "column", md: "row" }} spacing={1} flexWrap="wrap">
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

                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                fullWidth
                                                label="Your Name "
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

                                    {/* Phone Number Field with Country Code Selector */}

                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth variant="outlined">
                                                <Select
                                                    sx={{
                                                        height: 60, // default TextField height
                                                        '& .MuiSelect-select': {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '16.5px 14px',
                                                        },
                                                    }}
                                                    value={formData.phoneCountryCode}
                                                    onChange={(e) => handleCountryCodeChange(e.target.value)}

                                                >
                                                    {countryCodes.map((country) => (
                                                        <MenuItem key={country.code} value={country.code}>
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <Typography variant="body2">{country.code}</Typography>
                                                                <Typography>{country.name}</Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField
                                                fullWidth

                                                name="phone"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                placeholder={getPhonePlaceholder()}
                                                variant="outlined"
                                                error={!isValidPhone && formData.phone.length > 0}

                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Phone color="action" />
                                                        </InputAdornment>
                                                    ),
                                                }}
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

                                    {/* GDPR Agreement Section */}
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            border: 1,
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            bgcolor: gdprConsent.accepted ? 'success.light' : 'background.default',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={gdprConsent.accepted}
                                                        onChange={handleGdprConsentChange}
                                                        color="primary"
                                                        icon={<PrivacyTip />}
                                                        checkedIcon={<CheckCircle />}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="body2">
                                                        I have read and accept the GDPR Agreement
                                                    </Typography>
                                                }
                                            />
                                            <Button
                                                variant="text"
                                                size="small"
                                                startIcon={<OpenInNew />}
                                                onClick={openGdprModal}
                                                sx={{ ml: 'auto' }}
                                            >
                                                Read Agreement
                                            </Button>
                                        </Stack>

                                        {gdprConsent.accepted && gdprConsent.timestamp && (
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                                Consent given: {gdprConsent.timestamp.toLocaleString('en-GB')}
                                            </Typography>
                                        )}
                                    </Paper>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                        pt: 2
                                    }}>
                                        <Tooltip
                                            title={!gdprConsent.accepted ? "Please accept the GDPR agreement to enable email" : ""}
                                            placement="top"
                                        >
                                            <span style={{ display: 'inline-flex' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <OpenInNew />}
                                                    disabled={isSubmitting || !formData.message.trim() || !gdprConsent.accepted}
                                                    sx={{
                                                        px: 4,
                                                        py: 1.5,
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        minWidth: 200,
                                                        opacity: gdprConsent.accepted ? 1 : 0.7
                                                    }}
                                                >
                                                    {isSubmitting ? 'Opening...' : 'Open Email Client'}
                                                </Button>
                                            </span>
                                        </Tooltip>

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
                                            {gdprConsent.accepted ? 'GDPR Accepted ✓' : 'GDPR Required'}
                                        </Typography>
                                    </Box>

                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        <Typography variant="body2">
                                            <strong>GDPR Compliance:</strong> We take your privacy seriously. Your data will be processed in accordance with our privacy policy and GDPR requirements.
                                        </Typography>
                                    </Alert>
                                </Stack>
                            </form>

                            {/* Alternative Contact Methods */}
                            <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
                                <Typography variant="h6" gutterBottom>
                                    Alternative Contact Methods
                                </Typography>
                                <Stack direction={{ xs: "column", md: "row" }} spacing={2} flexWrap="wrap">
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
                                        href="https://linkedin.com/company/nordisk-support-7142983a2"
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
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* GDPR Agreement Modal */}
            <Modal
                open={gdprModalOpen}
                onClose={closeGdprModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={gdprModalOpen}>
                    <Box sx={gdprModalStyle}>
                        <DialogTitle sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography variant="h5">
                                GDPR Agreement & Privacy Policy
                            </Typography>
                            <IconButton onClick={closeGdprModal} sx={{ color: 'inherit' }}>
                                <Close />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent dividers sx={contentStyle}>
                            <Box sx={{ mb: 3 }}>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    <Typography variant="body2">
                                        <strong>Important:</strong> Please read this agreement carefully. You must accept these terms to contact us via email.
                                    </Typography>
                                </Alert>

                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography variant="h6">GDPR Compliance Agreement</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                            {gdprContent}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        What happens when you agree:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <CheckCircle color="success" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Your consent is logged with timestamp"
                                                secondary="We keep a record of when you accepted our terms"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <CheckCircle color="success" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Email submission enabled"
                                                secondary="The 'Open Email Client' button becomes active"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <CheckCircle color="success" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Your rights protected"
                                                secondary="You maintain all GDPR rights mentioned above"
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ p: 2, bgcolor: 'grey.100' }}>
                            <Button onClick={closeGdprModal}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleGdprConsentChange({ target: { checked: true } } as React.ChangeEvent<HTMLInputElement>);
                                    closeGdprModal();
                                }}
                                startIcon={<CheckCircle />}
                            >
                                I Accept & Agree
                            </Button>
                        </DialogActions>
                    </Box>
                </Fade>
            </Modal>

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
        </Box>
    );
};

export default Contact;