import React, { useState } from 'react';
import {
    Button,
    Tooltip,
    Box,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Email,
    ContentCopy,
    Download,
    Close,
    OpenInNew,
} from '@mui/icons-material';

interface SimpleEmailApplyButtonProps {
    jobTitle: string;
    jobId?: string | number;
    department?: string;
    location?: string;
    jobType?: string;
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

const SimpleEmailApplyButton: React.FC<SimpleEmailApplyButtonProps> = ({
    jobTitle,
    jobId,
    department,
    location,
    jobType = 'Full-time',
    variant = 'contained',
    size = 'medium',
    fullWidth = false
}) => {
    const HR_EMAIL = 'careers@nordisksupport.com';
    const [showFallback, setShowFallback] = useState(false);
    const [snackbar, setSnackbar] = useState({ 
        open: false, 
        message: '', 
        severity: 'success' as 'success' | 'error' | 'info' | 'warning' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // SHORT email template (under 2000 characters)
    const generateEmailContent = () => {
        const today = new Date();
        const applicationDate = today.toLocaleDateString();

        const subject = `Application: ${jobTitle}`;

        // Keep it SHORT and simple
        const body = `Application for: ${jobTitle}
${jobId ? `Job ID: ${jobId}` : ''}
${department ? `Department: ${department}` : ''}
${location ? `Location: ${location}` : ''}
${jobType ? `Job Type: ${jobType}` : ''}

Please include:
• Resume/CV (attached)
• Cover letter
• Contact information
• Current position

Best regards,
[Your Name]`;

        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const mailtoLink = `mailto:${HR_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

        return {
            subject,
            body,
            mailtoLink,
            encodedSubject,
            encodedBody
        };
    };

    // Method to open email in new tab
    const openEmailInNewTab = () => {
        const { mailtoLink } = generateEmailContent();
        
        // Create a form and submit it to open in new tab
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

    // Alternative method using window.open
    const openEmailWithWindowOpen = () => {
        const { mailtoLink } = generateEmailContent();
        return window.open(mailtoLink, '_blank', 'noopener,noreferrer');
    };

    const handleEmailApply = () => {
        setIsLoading(true);

        try {
            // Try method 1: Form submission (most reliable for new tab)
            const success = openEmailInNewTab();
            
            if (success) {
                setSnackbar({
                    open: true,
                    message: 'Opening email client in new tab...',
                    severity: 'info'
                });
            } else {
                // Fallback to window.open
                const win = openEmailWithWindowOpen();
                if (!win) {
                    setSnackbar({
                        open: true,
                        message: 'Popup blocked. Please allow popups for this site.',
                        severity: 'warning'
                    });
                    setShowFallback(true);
                } else {
                    setSnackbar({
                        open: true,
                        message: 'Email client opened in new tab.',
                        severity: 'success'
                    });
                }
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Email error:', error);
            setIsLoading(false);
            setSnackbar({
                open: true,
                message: 'Unable to open email client. Please use the fallback options.',
                severity: 'error'
            });
            setShowFallback(true);
        }
    };

    const copyEmailContent = () => {
        const { subject, body } = generateEmailContent();
        const emailContent = `To: ${HR_EMAIL}
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
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setSnackbar({ 
                    open: true, 
                    message: 'Copied to clipboard!',
                    severity: 'success'
                });
            });
    };

    const downloadEmailTemplate = () => {
        const { subject, body } = generateEmailContent();
        const template = `To: ${HR_EMAIL}
Subject: ${subject}

${body}

--- Instructions ---
1. Attach your resume/CV
2. Write your cover letter
3. Fill in your contact details
4. Send to ${HR_EMAIL}

Note: This is an application for the "${jobTitle}" position.`;

        const blob = new Blob([template], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Application_${jobTitle.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setSnackbar({
            open: true,
            message: 'Email template downloaded!',
            severity: 'success'
        });
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Tooltip title="Opens email client in new tab">
                    <Button
                        variant={variant}
                        size={size}
                        fullWidth={fullWidth}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <OpenInNew />}
                        onClick={handleEmailApply}
                        disabled={isLoading}
                        sx={{
                            backgroundColor: variant === 'contained' ? '#2196f3' : 'transparent',
                            '&:hover': {
                                backgroundColor: variant === 'contained' ? '#1976d2' : 'rgba(33, 150, 243, 0.08)',
                            }
                        }}
                    >
                        {isLoading ? 'Opening...' : 'Apply via Email'}
                    </Button>
                </Tooltip>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 1,
                    flexWrap: 'wrap' 
                }}>
                    <Tooltip title="Copy email content">
                        <IconButton
                            size="small"
                            onClick={copyEmailContent}
                            sx={{ 
                                fontSize: '0.875rem', 
                                color: copied ? 'success.main' : 'text.secondary'
                            }}
                        >
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Download template">
                        <IconButton
                            size="small"
                            onClick={downloadEmailTemplate}
                            sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                        >
                            <Download fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Direct email link">
                        <IconButton
                            size="small"
                            onClick={() => {
                                navigator.clipboard.writeText(HR_EMAIL);
                                setSnackbar({
                                    open: true,
                                    message: 'Email address copied!',
                                    severity: 'success'
                                });
                            }}
                            sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                        >
                            <Email fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Fallback Dialog */}
            <Dialog open={showFallback} onClose={() => setShowFallback(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Email Application</Typography>
                        <IconButton onClick={() => setShowFallback(false)} size="small">
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Unable to open email automatically. Please use one of these methods:
                    </Alert>

                    <Typography variant="h6" align="center" gutterBottom color="primary">
                        {HR_EMAIL}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                        Subject: Application for {jobTitle}
                    </Typography>

                    <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            Please include in your email:
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><Typography variant="caption">Your resume/CV (attached)</Typography></li>
                            <li><Typography variant="caption">Cover letter</Typography></li>
                            <li><Typography variant="caption">Contact information</Typography></li>
                            <li><Typography variant="caption">Current position</Typography></li>
                        </ul>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Job Details:
                        </Typography>
                        <Typography variant="body2">
                            {department && `Department: ${department}`}
                            {department && location && <br />}
                            {location && `Location: ${location}`}
                            {(department || location) && jobType && <br />}
                            {jobType && `Job Type: ${jobType}`}
                            {jobId && (department || location || jobType) && <br />}
                            {jobId && `Job ID: ${jobId}`}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' }}>
                    <Button 
                        onClick={() => {
                            const { subject, body } = generateEmailContent();
                            const emailContent = `To: ${HR_EMAIL}\nSubject: ${subject}\n\n${body}`;
                            navigator.clipboard.writeText(emailContent);
                            setSnackbar({ 
                                open: true, 
                                message: 'Full email content copied!',
                                severity: 'success'
                            });
                        }}
                    >
                        Copy All
                    </Button>
                    <Box>
                        <Button onClick={() => setShowFallback(false)} sx={{ mr: 1 }}>
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                const { mailtoLink } = generateEmailContent();
                                window.location.href = mailtoLink;
                            }}
                        >
                            Try Direct Open
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
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
        </>
    );
};

export default SimpleEmailApplyButton;