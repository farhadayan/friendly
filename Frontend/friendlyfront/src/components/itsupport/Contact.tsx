
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { countryCodes } from "../../dummy-data/country_codes";
import { useLocation } from "react-router-dom";
import {
    Box, Stack, Typography, useTheme, useMediaQuery, Container,

    Link,
    Button,

} from "@mui/material";
import {

    AccessTime,
    CheckCircle as CheckCircleIcon,
    SupportAgent,
} from "@mui/icons-material";

interface FormData {
    clientfname: string;
    clientlname: string;
    email: string;
    countrycode: string;
    mobile: string;
    query: string;
    website_source: string;
}

interface CountryCode {
    code: string;
    name: string;
}

interface EmailStatus {
    checking: boolean;
    exists: boolean | null;
    valid: boolean;
    error?: string;
}

export default function Contact() {
    const location = useLocation();
    // Extract website source from URL 
    // Example: /guidance/contact → "guidance"

    const getWebsiteSource = useCallback((): string => {
        const pathnameLower = location.pathname.toLowerCase(); // Use location.pathname directly
        const segments = pathnameLower.split('/').filter(segment => segment);

        // Split the path and get the first segment after /
        if (segments.length > 0) {
            const firstSegment = segments[0];

            // Map URL segments to database keys
            if (firstSegment.includes('itsupport') || firstSegment.includes('it-support')) {
                return 'itsupport';
            } else if (firstSegment.includes('software')) {
                return 'software';
            } else if (firstSegment.includes('guidance')) {
                return 'guidance';
            }

            // Return the segment as is (it will be mapped on backend)
            return firstSegment;
        }
        // Default to guidance
        return 'itsupport';
    }, [location.pathname]);

    const getPageTitle = (source: string): string => {
        switch (source) {
            case 'itsupport': return 'IT Support Contact';
            case 'software': return 'Software Solutions Contact';
            case 'guidance': return 'Guidance Contact';
            default: return 'Contact Us';
        }
    };

    // Initialize form state with memorized initial website source
    const initialState = useMemo((): FormData => ({
        clientfname: "",
        clientlname: "",
        email: "",
        countrycode: "+45",
        mobile: "",
        query: "",
        website_source: getWebsiteSource(),
    }), [getWebsiteSource]);

    const [form, setForm] = useState<FormData>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');


    const [emailStatus, setEmailStatus] = useState<EmailStatus>({
        checking: false,
        exists: null,
        valid: false
    });

    const [showAllFields, setShowAllFields] = useState(true);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const contacts = [
        {
            name: "Customer Care",
            role: "",
            avatar: "/images/team/sophia.jpg",
            email: "customercare@nordisksupport.com",
        },
        {
            name: "Sales Inquiries",
            role: "",
            avatar: "/images/team/alice.jpg",
            email: "sales@nordisksupport.com",
        },
        {
            name: "Technical Support",
            role: "",
            avatar: "/images/team/michael.jpg",
            email: "techteam@nordisksupport.com",
        }

    ];

    // Update website source when component mounts or URL changes
    useEffect(() => {
        const source = getWebsiteSource();
        setForm(prev => ({
            ...prev,
            website_source: source
        }));
    }, [getWebsiteSource, location]);

    // Watch for email changes and reset field visibility
    useEffect(() => {
        const email = form.email.trim();

        if (!email || !email.includes('@') || !email.includes('.')) {
            setShowAllFields(true);
        }
    }, [form.email]);

    // Real-time email checking with debounce and website source
    useEffect(() => {
        const checkEmail = async () => {
            const email = form.email.trim();

            if (!email || !email.includes('@') || !email.includes('.')) {
                return;
            }

            setEmailStatus(prev => ({ ...prev, checking: true }));

            try {
                // Add website_source as query parameter
                const params = new URLSearchParams();
                if (form.website_source) {
                    params.append('website_source', form.website_source);
                }

                const queryString = params.toString() ? `?${params.toString()}` : '';

                const response = await fetch(`http://localhost:5000/api/check-email/${encodeURIComponent(email)}${queryString}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const exists = Boolean(data.exists);

                setEmailStatus({
                    checking: false,
                    exists: exists,
                    valid: true,
                    error: data.error
                });

                if (exists) {
                    setShowAllFields(false);
                }

            } catch (error) {
                console.error('Email check error:', error);
                setEmailStatus({
                    checking: false,
                    exists: null,
                    valid: false,
                    error: 'Email check failed. Please try again.'
                });
            }
        };

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (form.email && form.email.includes('@') && form.email.includes('.') && form.email.length > 5) {
            debounceTimer.current = setTimeout(checkEmail, 500);
        }

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [form.email, form.website_source]);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //   const { name, value } = e.target;

    //   if (name === "email") {
    //     setEmailStatus({ checking: false, exists: null, valid: false });
    //     setShowAllFields(true);
    //   }

    //   setForm({ ...form, [name]: value });
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();

    //   if (!emailStatus.valid || emailStatus.checking) {
    //     setMessage("Please enter a valid email address");
    //     return;
    //   }

    //   setIsSubmitting(true);
    //   setMessage('');

    //   try {
    //     // Determine what data to send
    //     const dataToSend = emailStatus.exists
    //       ? {
    //         email: form.email,
    //         query: form.query,
    //         website_source: form.website_source
    //       }
    //       : { ...form };

    //     const res = await fetch("http://127.0.0.1:5000/api/client", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(dataToSend)
    //     });

    //     const data = await res.json();

    //     if (res.ok) {
    //       const successMessage = emailStatus.exists
    //         ? "Thank you! Your additional query has been submitted."
    //         : "Thank you! Your registration is complete.";

    //       setMessage(successMessage);

    //       if (emailStatus.exists) {
    //         setForm({
    //           ...form,
    //           query: ""
    //         });
    //       } else {
    //         setForm({
    //           ...initialState,
    //           website_source: form.website_source // Preserve website source
    //         });
    //         setEmailStatus({ checking: false, exists: null, valid: false });
    //         setShowAllFields(true);
    //       }

    //       setTimeout(() => setMessage(''), 5000);
    //     } else {
    //       // Handle FastAPI validation errors
    //       let errorMessage = 'Something went wrong. Please try again.';

    //       if (data.detail) {
    //         // FastAPI returns validation errors in detail
    //         if (Array.isArray(data.detail)) {
    //           // Multiple validation errors
    //           errorMessage = data.detail.map((err: any) =>
    //             `${err.loc ? err.loc.join('.') + ': ' : ''}${err.msg}`
    //           ).join(', ');
    //         } else if (typeof data.detail === 'string') {
    //           // Single error message
    //           errorMessage = data.detail;
    //         } else if (data.detail.message) {
    //           // Error object with message property
    //           errorMessage = data.detail.message;
    //         }
    //       } else if (data.error) {
    //         errorMessage = data.error;
    //       } else if (data.message) {
    //         errorMessage = data.message;
    //       }
    //       setEmailStatus({
    //         checking: false,
    //         exists: null,
    //         valid: false,
    //         error: errorMessage
    //       });
    //     }

    //   } catch (err) {
    //     console.error("Submission error:", err);
    //     setMessage('Network error. Please try again.');
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // };

    // Get page title based on website source
    const pageTitle = getPageTitle(form.website_source);

    // Styles
    const styles = {
        container: {
            display: "flex" as const,
            flexDirection: "column" as const,
            alignItems: "center" as const,
            justifyContent: "center" as const,
            minHeight: "100vh",
            background: "linear-gradient(0deg, #f6f6f6 0%, #e0f2fe 100%)",
            padding: "20px"
        },

        title: {
            color: form.website_source === 'itsupport' ? "#22543d" :
                form.website_source === 'software' ? "#7b341e" : "#1E3A8A",
            fontSize: "3rem",
            marginBottom: "30px",
            fontFamily: "Arial, sans-serif",
            textShadow: "2px 2px 5px rgba(0,0,0,0.3)"
        },
        form: {
            display: "flex" as const,
            flexDirection: "column" as const,
            gap: "15px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: "400px"
        },
        input: {
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            transition: "0.3s",
            width: "100%",
            boxSizing: "border-box" as const,
        },
        textarea: {
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            minHeight: "120px",
            resize: "vertical" as const,
            transition: "0.3s",
            width: "100%",
            boxSizing: "border-box" as const,
        },
        button: {
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold" as const,
            cursor: "pointer",
            transition: "0.3s",
            width: "100%"
        },
        statusIndicator: {
            display: "flex" as const,
            alignItems: "center" as const,
            gap: "5px",
            fontSize: "0.85rem",
            marginTop: "5px",
            flexWrap: "wrap" as const
        }
    };


    // Determine border color based on email status
    const getEmailBorderColor = () => {
        if (emailStatus.exists) return "#28a745";
        if (emailStatus.valid) return "#2575fc";
        if (form.email) return "#dc3545";
        return "#ccc";
    };


    return (
        <Box sx={{ backgroundColor: "transparent", overflow: "hidden" }}>
            {/* ================= HERO ================= */}
            <Box
                sx={{
                    width: '100vw',
                    height: { xs: 250, md: 350 },
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)',
                    px: { xs: 2, md: 4 }, // Add padding directly to the Box instead
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',

                        gap: 0,

                        overflow: 'hidden',

                        backgroundColor: 'white',

                    }}
                >

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: { xs: 'center', md: 'flex-start' },
                            textAlign: { xs: 'center', md: 'left' },
                            background: 'linear-gradient(270deg, transparent 0%, #2f6d70 70%)',
                            color: 'white',
                            p: { xs: 4, md: 8 },
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'url(/patterns/dots.svg)',
                                opacity: 0.1,
                            }
                        }}
                    >
                        <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography variant="h2" >
                                Love To Hear You
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.1rem',
                                    opacity: 0.95,
                                    lineHeight: 1.6,
                                    maxWidth: '90%',
                                }}
                            >
                                Need IT support, software solutions, or expert guidance?
                                Our team is ready to help you move forward with innovative solutions.
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <AccessTime sx={{ mr: 2, fontSize: '1.2rem' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Mon–Fri · 8:00 AM – 4:00 PM
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <SupportAgent sx={{ mr: 2, fontSize: '1.2rem' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        24/7 IT Support Available
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                    <Link href="tel:+4566776951" sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        color: '#fff',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}>

                                        📞 +45 66 77 69 51
                                    </Link>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Button

                                    size="large"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#2f6d70',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                >
                                    Contact Us Now
                                </Button>
                            </Box>
                        </Stack>
                    </Box>

                    {/* Image Section */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <Box
                            component="img"
                            src="/logos/contactbanner.jpg"
                            alt="Nordisk contact"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center center',
                                display: 'block',
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* ================= CONTENT ================= */}
            <Container maxWidth="lg" sx={{ py: { xs: 8 }, my: 8 }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 5, md: 8 }}
                    sx={{ py: { xs: 6, md: 10 } }}
                >
                    {/* ===== LEFT: CONTACT DETAILS ===== */}
                    <Box flex={1}>
                        <Stack spacing={4}>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 600 }}
                            >
                                Write To Us
                            </Typography>

                            <Stack spacing={3}>
                                {contacts.map((item) => (
                                    <Box
                                        key={item.email}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e7eb",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",


                                        }}
                                    >
                                        <Typography variant="body2" >
                                            {item.name}
                                        </Typography>

                                        <Link
                                            href={`mailto:${item.email}`}
                                            sx={{
                                                fontSize: { xs: "12px", md: "18px" },
                                                color: "#1e40af",
                                                opacity: 0.8,
                                                textDecoration: "none",
                                                "&:hover": { color: 'primary.main', textDecoration: "underline" },
                                            }}>
                                            {item.email}

                                        </Link>

                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    </Box>

                    {/* ===== RIGHT: IMAGE + TRUST ===== */}
                    <Box
                        flex={1}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <form>
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 600, mb: 2 }}
                                >
                                    Contact Form
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Please fill out the form on the left to get in touch with us. We look forward to assisting you!
                                </Typography>
                            </Box>
                        </form>
                        {/* <Box
                            component="img"
                            src="/logos/contact.webp"
                            alt="Nordisk Support contact"
                            sx={{
                                width: "100%",
                                //maxWidth: 520,
                                borderRadius: 3,
                                boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                            }}
                        /> */}

                    </Box>
                </Stack>
            </Container>
        </Box>
    );


}
