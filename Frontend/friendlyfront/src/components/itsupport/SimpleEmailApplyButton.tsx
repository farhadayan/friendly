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
    Checkbox,
    FormControlLabel,
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
    fullWidth = false,
}) => {
    const HR_EMAIL = 'careers@nordisksupport.com';

    const [isLoading, setIsLoading] = useState(false);
    const [showFallback, setShowFallback] = useState(false);
    const [copied, setCopied] = useState(false);

    // GDPR
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const [gdprDialogOpen, setGdprDialogOpen] = useState(false);
    const [gdprTimestamp, setGdprTimestamp] = useState<string | null>(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning',
    });

    // EMAIL CONTENT
    const generateEmailContent = () => {
        const subject = `Application: ${jobTitle}`;

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

--- GDPR CONSENT ---
Accepted on: ${gdprTimestamp}
Purpose: Recruitment and hiring process

Best regards,
[Your Name]`;

        return {
            subject,
            body,
            mailtoLink: `mailto:${HR_EMAIL}?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`,
        };
    };

    const openEmail = () => {
        const { mailtoLink } = generateEmailContent();
        window.open(mailtoLink, '_blank', 'noopener,noreferrer');
    };

    const handleApply = () => {
        if (!gdprAccepted) {
            setSnackbar({
                open: true,
                message: 'You must accept the GDPR agreement to apply.',
                severity: 'warning',
            });
            return;
        }

        setIsLoading(true);
        openEmail();
        setTimeout(() => setIsLoading(false), 800);
    };

    const copyEmailContent = () => {
        const { subject, body } = generateEmailContent();
        navigator.clipboard.writeText(
            `To: ${HR_EMAIL}\nSubject: ${subject}\n\n${body}`
        );
        setCopied(true);
        setSnackbar({
            open: true,
            message: 'Email content copied!',
            severity: 'success',
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadEmailTemplate = () => {
        const { subject, body } = generateEmailContent();
        const blob = new Blob(
            [`To: ${HR_EMAIL}\nSubject: ${subject}\n\n${body}`],
            { type: 'text/plain' }
        );
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Application_${jobTitle.replace(/\s+/g, '_')}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* GDPR CHECKBOX */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={gdprAccepted}
                            onChange={(e) => {
                                setGdprAccepted(e.target.checked);
                                setGdprTimestamp(new Date().toISOString());
                            }}
                        />
                    }
                    label={
                        <Typography variant="caption">
                            I agree to the processing of my personal data for recruitment
                            purposes.{' '}
                            <Button
                                size="small"
                                variant="text"
                                onClick={() => setGdprDialogOpen(true)}
                            >
                                Read agreement
                            </Button>
                        </Typography>
                    }
                />

                {/* APPLY BUTTON */}
                <Button
                    variant={variant}
                    size={size}
                    fullWidth={fullWidth}
                    startIcon={
                        isLoading ? (
                            <CircularProgress size={18} color="inherit" />
                        ) : (
                            <OpenInNew />
                        )
                    }
                    onClick={handleApply}
                    disabled={isLoading || !gdprAccepted}
                >
                    {isLoading ? 'Opening…' : 'Apply via Email'}
                </Button>

                {/* ACTION ICONS */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={copyEmailContent}>
                        <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={downloadEmailTemplate}>
                        <Download fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => navigator.clipboard.writeText(HR_EMAIL)}
                    >
                        <Email fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* GDPR DIALOG */}
            <Dialog
                open={gdprDialogOpen}
                onClose={() => setGdprDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Candidate Privacy Notice (GDPR)</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" paragraph>
                        Nordisk Support processes your personal data solely for recruitment
                        and hiring purposes.
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Your data will be reviewed by our hiring team and retained for a
                        maximum of 12 months.
                    </Typography>
                    <Typography variant="body2">
                        You may request access, correction, or deletion of your data at any
                        time by contacting:{' '}
                        <strong>data-privacy@nordisksupport.com</strong>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setGdprDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* SNACKBAR */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    );
};

export default SimpleEmailApplyButton;
