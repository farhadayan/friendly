
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

import {
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  AppBar,
  Toolbar
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
//import SidebarMenu from "./SidebarMenu";
import { SiteConfig, sites } from '../siteConfig';

export default function Header() {
  //const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  //const { site } = useContext(ThemeContext);
  const location = useLocation();

  // Determine current site key
  const path = location.pathname.split('/')[1] as keyof typeof sites;
  const siteConfig: SiteConfig = sites[path] || sites.software;

  // Apply dynamic CSS variables to body
  useEffect(() => {
    document.body.style.setProperty('--primary', siteConfig.primaryColor);
    document.body.style.setProperty('--header-bg', siteConfig.headerBgShade || siteConfig.primaryColor);
    document.body.style.setProperty('--header-text', siteConfig.headerTextColor || '#fff');
    document.body.style.paddingTop = `${siteConfig.headerHeight || 64}px`;
  }, [siteConfig]);

  //const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      
      setSearchQuery('');
    }
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'var(--header-bg)',
          color: 'var(--header-text)',
          height: siteConfig.headerHeight || 64,
          boxShadow: 'none',
          borderBottom: '1px solid #e2e8f0',
          transition: 'all 0.3s ease'
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
              to={`/${path || 'software'}/home`}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <img
                src={siteConfig.logo}
                alt="Logo"
                style={{
                  width: siteConfig.logoWidth || 60,
                  height: siteConfig.logoHeight || 60,
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
              />
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
                {siteConfig.name}
              </Typography>
            </Link>
          </Box>

          {/* Center Section: Search Box */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              mx: 4,
              flex: 1,
              maxWidth: 400
            }}
          >
            <TextField
              size="small"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: siteConfig.primaryColor },
                  '&.Mui-focused fieldset': { borderColor: siteConfig.primaryColor },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--header-text)' }}
              onClick={() => console.log('Open mobile search')}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Search Bar */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            p: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TextField
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: '95%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: 2,
                '& fieldset': { borderColor: 'transparent' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </AppBar>

      {/* Sidebar Menu */}
      {/* <SidebarMenu open={isSidebarOpen} onClose={toggleSidebar} /> */}
    </>
  );
}
