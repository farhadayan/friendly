import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Alert,
    InputAdornment,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Divider,
    GridLegacy as Grid,
    CircularProgress,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import {
    Close,
    Email,
    Phone,
    Person,
    Work,
    LocationOn,
    LinkedIn,
    Language,
    AttachFile,
} from '@mui/icons-material';

// TypeScript Interfaces
interface JobPosition {
    id: number | string;
    title: string;
    department: string;
    location: string;
    type?: string;
}

interface FormData {
    full_name: string;
    email: string;
    phone: string;
    current_company: string;
    current_position: string;
    linkedin_url: string;
    portfolio_url: string;
    cover_letter: string;
    salary_expectation: string;
    notice_period: string;
    referral_source: string;
    agree_to_terms: boolean;
}

interface JobApplicationFormProps {
    open: boolean;
    onClose: () => void;
    jobPosition: JobPosition | null;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
    open,
    onClose,
    jobPosition
}) => {
    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        email: '',
        phone: '',
        current_company: '',
        current_position: '',
        linkedin_url: '',
        portfolio_url: '',
        cover_letter: '',
        salary_expectation: '',
        notice_period: '30',
        referral_source: 'Website',
        agree_to_terms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));
    };

    const handleSelectChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.cover_letter.trim()) newErrors.cover_letter = 'Cover letter is required';
        if (!formData.agree_to_terms) newErrors.agree_to_terms = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateEmailContent = (): { subject: string; body: string } => {
        const now = new Date();
        const applicationDate = now.toLocaleDateString('en-GB');
        const applicationTime = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Calculate available from date
        const availableFrom = new Date(now);
        availableFrom.setDate(availableFrom.getDate() + parseInt(formData.notice_period || '30'));
        const availableFromStr = availableFrom.toLocaleDateString('en-GB');

        const subject = `Job Application: ${jobPosition?.title || 'General Application'} - ${formData.full_name}`;

        // Create a well-formatted email body with proper line breaks
        const body = `APPLICATION FOR: ${jobPosition?.title || 'General Application'}
POSITION ID: ${jobPosition?.id || 'N/A'}
DEPARTMENT: ${jobPosition?.department || 'Various'}
LOCATION: ${jobPosition?.location || 'Multiple'}
JOB TYPE: ${jobPosition?.type || 'Full-time'}

--- PERSONAL INFORMATION ---
Full Name: ${formData.full_name}
Email: ${formData.email}
Phone: ${formData.phone}
How did you hear about us?: ${formData.referral_source}

--- PROFESSIONAL INFORMATION ---
Current Company: ${formData.current_company || 'Not specified'}
Current Position: ${formData.current_position || 'Not specified'}
LinkedIn Profile: ${formData.linkedin_url || 'Not provided'}
Portfolio/Website: ${formData.portfolio_url || 'Not provided'}

--- ADDITIONAL INFORMATION ---
Salary Expectation: ${formData.salary_expectation || 'Negotiable'}
Notice Period: ${formData.notice_period} days
Available From: ${availableFromStr}

--- COVER LETTER ---
${formData.cover_letter}

--- APPLICATION DETAILS ---
Application Date: ${applicationDate}
Application Time: ${applicationTime}
Position Applied: ${jobPosition?.title || 'General Application'}

IMPORTANT: Please attach your resume/CV to this email.

Best regards,
${formData.full_name}
${formData.email}
${formData.phone}

---
This email was generated by Nordisk Support Careers Portal.
Please do not reply to this automated message.`;

        return { subject, body };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const { subject, body } = generateEmailContent();

            // Encode the subject and body for mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);

            // Create mailto link with CC and BCC options
            const mailtoLink = `mailto:careers@nordisksupport.com?subject=${encodedSubject}&body=${encodedBody}`;

            // Try to open email client in new tab
            const emailWindow = window.open(mailtoLink, '_blank');

            if (!emailWindow || emailWindow.closed) {
                // Fallback: Use location.href
                window.location.href = mailtoLink;
            }

            // Show success message
            setSuccess(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setSuccess(false);
                setLoading(false);
                onClose();
                setFormData({
                    full_name: '',
                    email: '',
                    phone: '',
                    current_company: '',
                    current_position: '',
                    linkedin_url: '',
                    portfolio_url: '',
                    cover_letter: '',
                    salary_expectation: '',
                    notice_period: '30',
                    referral_source: 'Website',
                    agree_to_terms: false,
                });
                setErrors({});
            }, 3000);

        } catch (error) {
            setErrors({ submit: 'Failed to open email client. Please try again.' });
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;
        onClose();
        setErrors({});
        setSuccess(false);
    };

    // Pre-fill form for testing
    React.useEffect(() => {
        if (open && process.env.NODE_ENV === 'development') {
            // Auto-fill for testing
            setFormData({
                full_name: 'Test Applicant',
                email: 'test@example.com',
                phone: '+46 70 123 4567',
                current_company: 'Tech Corp',
                current_position: 'Software Developer',
                linkedin_url: 'https://linkedin.com/in/test',
                portfolio_url: 'https://github.com/test',
                cover_letter: 'I am writing to apply for the Senior Full Stack Developer position at Nordisk Support. With over 5 years of experience in React, Node.js, and cloud technologies, I am confident I can contribute to your team.',
                salary_expectation: 'Competitive salary based on experience',
                notice_period: '30',
                referral_source: 'Website',
                agree_to_terms: false,
            });
        }
    }, [open]);

    const HR_EMAIL = 'careers@nordisksupport.com';

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '95%', sm: '90%', md: 700 },
                maxHeight: '90vh',
                overflowY: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 0,
            }}>
                {/* Header */}
                <Box sx={{
                    p: 3,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderRadius: '8px 8px 0 0',
                }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Apply for {jobPosition?.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {jobPosition?.department} • {jobPosition?.location}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
                            Your application will be sent via email
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            color: 'white',
                            ml: 1,
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                        }}
                        disabled={loading}
                    >
                        <Close />
                    </IconButton>
                </Box>

                {success ? (
                    <Box sx={{ p: 6, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <CircularProgress size={60} thickness={3} sx={{ color: 'success.main' }} />
                        </Box>
                        <Alert severity="success" sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Opening Email Client...
                            </Typography>
                        </Alert>
                        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                            Your email client should open with a pre-filled application.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Please attach your resume and click send to complete your application.
                        </Typography>
                        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                                If your email client didn't open automatically, please email us at:
                                <br />
                                <strong>{HR_EMAIL}</strong>
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ p: 3 }}>
                            <Alert severity="info" sx={{ mb: 3 }}>
                                <Typography variant="body2">
                                    Complete this form and we'll open your email client with a pre-filled application.
                                    You'll need to attach your resume manually before sending.
                                </Typography>
                            </Alert>

                            {errors.submit && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {errors.submit}
                                </Alert>
                            )}

                            {/* Personal Information */}
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                Personal Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name *"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        error={!!errors.full_name}
                                        helperText={errors.full_name}
                                        disabled={loading}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email *"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        disabled={loading}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number *"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        disabled={loading}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>How did you hear about us?</InputLabel>
                                        <Select
                                            name="referral_source"
                                            value={formData.referral_source}
                                            onChange={handleSelectChange}
                                            label="How did you hear about us?"
                                            disabled={loading}
                                        >
                                            <MenuItem value="Website">Our Website</MenuItem>
                                            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                            <MenuItem value="Indeed">Indeed</MenuItem>
                                            <MenuItem value="Glassdoor">Glassdoor</MenuItem>
                                            <MenuItem value="Referral">Employee Referral</MenuItem>
                                            <MenuItem value="Job Board">Job Board</MenuItem>
                                            <MenuItem value="Social Media">Social Media</MenuItem>
                                            <MenuItem value="Career Fair">Career Fair</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Professional Information */}
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                Professional Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Current Company"
                                        name="current_company"
                                        value={formData.current_company}
                                        onChange={handleChange}
                                        disabled={loading}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Work fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Current Position"
                                        name="current_position"
                                        value={formData.current_position}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="LinkedIn Profile"
                                        name="linkedin_url"
                                        value={formData.linkedin_url}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="https://linkedin.com/in/username"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LinkedIn fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Portfolio/Website"
                                        name="portfolio_url"
                                        value={formData.portfolio_url}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="https://yourportfolio.com"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Language fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Additional Information */}
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                Additional Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Salary Expectation"
                                        name="salary_expectation"
                                        value={formData.salary_expectation}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="e.g., $70,000 - $85,000 or Negotiable"
                                        helperText="Optional - Annual salary or range"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Notice Period</InputLabel>
                                        <Select
                                            name="notice_period"
                                            value={formData.notice_period}
                                            onChange={handleSelectChange}
                                            label="Notice Period"
                                            disabled={loading}
                                        >
                                            <MenuItem value="0">Immediately Available</MenuItem>
                                            <MenuItem value="15">15 Days</MenuItem>
                                            <MenuItem value="30">30 Days (1 Month)</MenuItem>
                                            <MenuItem value="60">60 Days (2 Months)</MenuItem>
                                            <MenuItem value="90">90 Days (3 Months)</MenuItem>
                                            <MenuItem value="120">120+ Days</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* Cover Letter */}
                            <Box sx={{ mt: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Cover Letter *"
                                    name="cover_letter"
                                    value={formData.cover_letter}
                                    onChange={handleChange}
                                    error={!!errors.cover_letter}
                                    helperText={errors.cover_letter || "Tell us why you're interested in this position"}
                                    disabled={loading}
                                    multiline
                                    rows={6}
                                    placeholder={`I am writing to apply for the ${jobPosition?.title} position at Nordisk Support.

With my experience in [mention relevant skills/technologies], I am confident I can contribute to your team.

[Add specific examples of your achievements]

I am excited about this opportunity because [mention why you want to work at Nordisk Support].

Thank you for considering my application.`}
                                />
                            </Box>

                            {/* Resume Notice */}
                            <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 1, border: '1px solid', borderColor: 'warning.main' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <AttachFile fontSize="small" color="warning" />
                                    <Typography variant="subtitle2" color="warning.dark">
                                        Important: Attach Your Resume
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="warning.dark">
                                    Your email client will open with a pre-filled application.
                                    <strong> Don't forget to attach your resume/CV</strong> before sending the email.
                                </Typography>
                            </Box>

                            {/* Terms and Conditions */}
                            <Box sx={{ mt: 3 }}>
                                <FormControl error={!!errors.agree_to_terms} component="fieldset">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.agree_to_terms}
                                                onChange={handleCheckboxChange}
                                                name="agree_to_terms"
                                                color="primary"
                                                disabled={loading}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2">
                                                I agree that my information will be processed for recruitment purposes and
                                                will be sent via email to {HR_EMAIL}
                                            </Typography>
                                        }
                                    />
                                    {errors.agree_to_terms && (
                                        <FormHelperText>{errors.agree_to_terms}</FormHelperText>
                                    )}
                                </FormControl>
                            </Box>

                            {/* Submit Button */}
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                    disabled={loading}
                                    sx={{ minWidth: 100 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        minWidth: 200,
                                        position: 'relative',
                                        '&:disabled': {
                                            backgroundColor: 'primary.main',
                                            opacity: 0.7
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                                            Opening Email...
                                        </>
                                    ) : (
                                        'Open Email to Apply'
                                    )}
                                </Button>
                            </Box>

                            {/* Alternative Email */}
                            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1, textAlign: 'center' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Or send your application directly to: <strong>{HR_EMAIL}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    </form>
                )}
            </Box>
        </Modal>
    );
};

export default JobApplicationForm;