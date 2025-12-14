
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { SiteConfig, sites } from '../siteConfig';

export default function Header() {
  const location = useLocation();

  // Determine current site key
  const path = location.pathname.split('/')[1] as keyof typeof sites;
  const siteConfig: SiteConfig = sites[path] || sites.itsupport; // default site

  // Apply dynamic CSS variables to body
  useEffect(() => {
    document.body.style.setProperty('--primary', siteConfig.primaryColor);
    document.body.style.setProperty('--header-bg', siteConfig.headerBgShade || siteConfig.primaryColor);
    document.body.style.setProperty('--header-text', siteConfig.headerTextColor || '#fff');
    document.body.style.paddingTop = `${siteConfig.headerHeight || 64}px`;
  }, [siteConfig]);

  return (
    <>
      <AppBar
        sx={{

          backgroundColor: 'var(--header-bg)',
          color: 'var(--header-text)',
          height: siteConfig.headerHeight || 64,
          boxShadow: 'none',
          borderBottom: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          '& *': {
            fontSize: { xs: 12, md: 24 }
          }
        }}
      >
        <Toolbar sx={{
          minHeight: '100% !important',
          justifyContent: 'space-between',
          px: { xs: 1, sm: 2, md: 3 }
        }}>
          {/* Left Section: Logo and Site Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              to={`/${path || 'itsupport'}/home`}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <img
                src={siteConfig.logo}
                alt="Logo"
                style={{
                  width: siteConfig.logoWidth || 80,
                  height: siteConfig.logoHeight || 80,
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
              />
            </Link>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.2rem' },
                color: 'var(--header-text)',
              }}
            >
              {siteConfig.name}
            </Typography>
          </Box>
          <Box sx={{ alignItems: "center" }} >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.7rem' },
                color: '#1e40af',
              }}
            >
              Nordisk Support
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: { xs: 1, sm: 2, md: 6 } }}>
            <Link to={`/${path || 'itsupport'}/contact`}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}
            >

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                  color: 'var(--header-text)',
                  '&:hover': {
                    color: 'var(--accent)',
                    transition: 'color 0.2s ease'
                  }
                }}
              >
                Contact
              </Typography>
            </Link>
          </Box>
        </Toolbar>


      </AppBar>
    </>
  );
}
