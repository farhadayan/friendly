import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { countryCodes } from "../../dummy-data/country_codes";
import { useLocation } from "react-router-dom";
import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailStatus({ checking: false, exists: null, valid: false });
      setShowAllFields(true);
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailStatus.valid || emailStatus.checking) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Determine what data to send
      const dataToSend = emailStatus.exists
        ? {
          email: form.email,
          query: form.query,
          website_source: form.website_source
        }
        : { ...form };

      const res = await fetch("http://127.0.0.1:5000/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await res.json();

      if (res.ok) {
        const successMessage = emailStatus.exists
          ? "Thank you! Your additional query has been submitted."
          : "Thank you! Your registration is complete.";

        setMessage(successMessage);

        if (emailStatus.exists) {
          setForm({
            ...form,
            query: ""
          });
        } else {
          setForm({
            ...initialState,
            website_source: form.website_source // Preserve website source
          });
          setEmailStatus({ checking: false, exists: null, valid: false });
          setShowAllFields(true);
        }

        setTimeout(() => setMessage(''), 5000);
      } else {
        // Handle FastAPI validation errors
        let errorMessage = 'Something went wrong. Please try again.';

        if (data.detail) {
          // FastAPI returns validation errors in detail
          if (Array.isArray(data.detail)) {
            // Multiple validation errors
            errorMessage = data.detail.map((err: any) =>
              `${err.loc ? err.loc.join('.') + ': ' : ''}${err.msg}`
            ).join(', ');
          } else if (typeof data.detail === 'string') {
            // Single error message
            errorMessage = data.detail;
          } else if (data.detail.message) {
            // Error object with message property
            errorMessage = data.detail.message;
          }
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        }
        setEmailStatus({
          checking: false,
          exists: null,
          valid: false,
          error: errorMessage
        });
      }

    } catch (err) {
      console.error("Submission error:", err);
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Determine button color based on website source
  const getButtonColor = () => {
    if (emailStatus.exists) return "#28a745";
    return form.website_source === 'itsupport' ? "#48bb78" :
      form.website_source === 'software' ? "#ed8936" : "#2575fc";
  };

  return (
    // <div style={styles.container}>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "linear-gradient(to bottom, #e8f3ff, #ffffff)",
        paddingTop: 8,
      }}
    >
      {/* Title Section */}
      <Stack
        direction="column"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.5px"
            }}
          >

            Have a project in mind? Need IT help?
            We’re here to assist you.
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: "15px",
              color: "#3b82f6",
              letterSpacing: "0.5px",
            }}
          >
            📞 Phone: +45  123 (-HELP)|{" "} 📧 Email: customercare@nordisksupport.com

          </Typography>
        </Stack>
        <Typography
          variant="h6"
          sx={{ color: "#444", fontSize: "18px" }}
        >
          Business Hours
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Typography

            sx={{
              fontWeight: 600,
              color: "#0D6EFD",
              letterSpacing: "0.5px",
            }}
          >
            Mon–Fri: 8:00 AM – 4:00 PM<br />
            Emergency IT Support: 24/7

          </Typography>
        </Stack>


        <Typography
          variant="body2"
          sx={{ color: "#666", fontSize: "14px" }}
        >
          24/7 IT support — fast, reliable, and always here to help.
        </Typography>
      </Stack>
      <br></br>
      {/* Status Messages */}
      {
        message && (
          <div style={{
            backgroundColor: message.includes('Thank you') ? "#d4edda" : "#f8d7da",
            color: message.includes('Thank you') ? "#155724" : "#721c24",
            padding: "10px 20px",
            borderRadius: "8px",
            marginBottom: "20px",
            maxWidth: "400px",
            textAlign: "center" as const,
            width: "100%"
          }}>
            {message}
          </div>
        )
      }

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Email Field */}
        <div>
          <input
            style={{
              ...styles.input,
              borderColor: getEmailBorderColor(),
              borderWidth: "2px"
            }}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />

          {/* Email Status Indicator */}
          <div style={styles.statusIndicator}>
            {emailStatus.checking && (
              <>
                <span style={{ color: "#6c757d" }}>Checking email...</span>
                <div style={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #3498db",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
              </>
            )}

            {!emailStatus.checking && emailStatus.exists === true && (
              <span style={{ color: "#28a745" }}>
                ✓ Welcome back! Your details are saved.
              </span>
            )}

            {!emailStatus.checking && emailStatus.exists === false && emailStatus.valid && (
              <span style={{ color: "#17a2b8" }}>
                New user - please fill in your details
              </span>
            )}

            {!emailStatus.checking && !emailStatus.valid && form.email && (
              <span style={{ color: "#dc3545" }}>
                Please enter a valid email address
              </span>
            )}

            {emailStatus.error && (
              <span style={{ color: "#dc3545", fontSize: "0.8rem" }}>
                {emailStatus.error}
              </span>
            )}
          </div>
        </div>

        {/* Personal Info Fields (Conditional) */}
        {showAllFields ? (
          <>
            <input
              style={styles.input}
              type="text"
              name="clientfname"
              placeholder="First Name"
              value={form.clientfname}
              onChange={handleChange}
              disabled={isSubmitting || emailStatus.exists === true}
              required={emailStatus.exists === false}
            />

            <input
              style={styles.input}
              type="text"
              name="clientlname"
              placeholder="Last Name"
              value={form.clientlname}
              onChange={handleChange}
              disabled={isSubmitting || emailStatus.exists === true}
              required={emailStatus.exists === false}
            />

            <select
              style={styles.input}
              name="countrycode"
              value={form.countrycode}
              onChange={handleChange}
              disabled={isSubmitting || emailStatus.exists === true}
              required={emailStatus.exists === false}
            >
              {countryCodes.map((country: CountryCode) => (
                <option key={country.name} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>

            <input
              style={styles.input}
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              disabled={isSubmitting || emailStatus.exists === true}
              required={emailStatus.exists === false}
            />
          </>
        ) : (
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center" as const,
            color: "#6c757d",
            fontSize: "0.9rem"
          }}>
            Your personal details are already saved in our system.
          </div>
        )}

        {/* Query Field (Always Visible) */}
        <textarea
          style={styles.textarea}
          name="query"
          placeholder={emailStatus.exists ?
            "What additional help do you need?" :
            `Your ${form.website_source === 'itsupport' ? 'IT support' :
              form.website_source === 'software' ? 'software' : 'guidance'} query`}
          value={form.query}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />

        {/* Hidden website source field */}
        <input type="hidden" name="website_source" value={form.website_source} />

        {/* Submit Button */}
        <button
          style={{
            ...styles.button,
            backgroundColor: getButtonColor(),
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
          type="submit"
          disabled={isSubmitting || emailStatus.checking || !emailStatus.valid}
        >
          {isSubmitting ? (
            <>
              <span>Sending...</span>
              <div style={{
                display: 'inline-block',
                marginLeft: '8px',
                width: '12px',
                height: '12px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </>
          ) : emailStatus.exists ? (
            'Submit Additional Query'
          ) : (
            'Submit Query'
          )}
        </button>
      </form>

      {/* Add CSS for spinner animation */}
      <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          input:focus, textarea:focus, select:focus {
            border-color: #4299e1 !important;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
          }
          
          input:disabled, textarea:disabled, select:disabled {
            background-color: #f7fafc;
            cursor: not-allowed;
          }
        `}</style>
    </Box >
  );
}
