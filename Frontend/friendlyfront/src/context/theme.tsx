import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Step 1: Create a base theme with mobile-first settings
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,    // Mobile phones (default)
            sm: 600,  // Tablets
            md: 900,  // Small laptops
            lg: 1200, // Desktops
            xl: 1536, // Large screens
        },
    },
    typography: {
        // Define your font families
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        // Define ALL your typography variants for the 'xs' (mobile) breakpoint
        h1: {
            fontSize: '1.8rem',      // ~32px on mobile
            fontWeight: 700,
            lineHeight: 1.2,
            // Laptop/Desktop overrides:
            [createTheme().breakpoints.up('md')]: { // ≥ 900px
                fontSize: '2.5rem',  // ~40px on laptops
            },
            [createTheme().breakpoints.up('lg')]: { // ≥ 1200px
                fontSize: '3rem',    // ~48px on desktops
            },
        },
        h2: {
            fontSize: '1.7rem',   // ~28px on mobile
            fontWeight: 700,
            lineHeight: 1.3,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '2.25rem', // ~36px
            },
            [createTheme().breakpoints.up('lg')]: {
                fontSize: '2.75rem', // ~44px
            },
        },
        h3: {
            fontSize: '1.5rem',    // ~24px on mobile
            fontWeight: 600,
            lineHeight: 1.2,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.775rem', // ~30px
            },
            [createTheme().breakpoints.up('lg')]: {
                fontSize: '2.25rem',  // ~36px
            },
        },
        h4: {
            fontSize: '1.25rem',   // ~20px on mobile
            fontWeight: 600,
            lineHeight: 1.4,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.5rem',   // ~24px
            },
            [createTheme().breakpoints.up('lg')]: {
                fontSize: '1.75rem',  // ~28px
            },
        },
        h5: {
            fontSize: '1.1rem',  // ~18px on mobile
            fontWeight: 500,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.25rem',  // ~20px
            },

        },
        h6: {
            fontSize: '0.9rem',      // ~16px on mobile
            opacity: 0.8,
            fontWeight: 400,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.125rem', // ~18px
            },
        },

        body1: {
            fontSize: '1rem',      // ~16px - Standard body text
            lineHeight: 1.6,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1.125rem', // ~18px
                lineHeight: 1.7,
            },
        },
        body2: {
            fontSize: '0.875rem',  // ~14px - Smaller body text
            lineHeight: 1.6,
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1rem',     // ~16px
            },
        },

        button: {
            fontSize: '0.8rem', // ~15px - Button text
            fontWeight: 500,
            marginBottom: 8,
            color: 'black',
            textTransform: 'none', // Optional: Makes buttons not ALL CAPS
            [createTheme().breakpoints.up('md')]: {
                fontSize: '1rem',     // ~16px
            },

        },

    },

    // The COMPONENTS section is where you customize MUI components like Button
    components: {
        MuiButton: {

            styleOverrides: {
                // Base styles for ALL Button variants
                root: {
                    textTransform: 'none',  // Prevents auto-capitalization
                    borderRadius: '8px',    // Custom border radius
                    fontWeight: 600,
                },
                // Styles specific to the 'contained' variant
                contained: {
                    backgroundColor: "white",  // Your desired black
                    color: '#0A0A0A',       // White text
                    '&:hover': {
                        backgroundColor: "#f8fafc",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",

                    },
                    // Responsive font size for the contained variant
                    fontSize: '0.9375rem',       // ~15px default
                    [createTheme().breakpoints.up('md')]: {
                        fontSize: '1.0625rem',     // ~17px on laptops
                    },

                },

            }
        },

        MuiCard: {
            styleOverrides: {
                root: {

                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    transition: "all 0.3s ease",
                    textDecoration: "none",                // Very rounded corners
                    overflow: 'hidden',
                    "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                    },
                }
            }
        }
    }
});

export default theme;