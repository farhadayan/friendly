import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Close as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Computer as ComputerIcon,
  Code as CodeIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  Devices as DevicesIcon,
  Checklist as ChecklistIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { SiteConfig, sites } from '../siteConfig';

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ open, onClose }: SidebarMenuProps) {
  const location = useLocation();
  const path = location.pathname.split('/')[1] as keyof typeof sites;
  const siteConfig: SiteConfig = sites[path] || sites.software; // default site

  const isActivePath = (linkPath: string) => location.pathname === linkPath;

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 56,
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          height: `calc(100vh - ${siteConfig.headerHeight || 64}px)`,
          marginTop: `${siteConfig.headerHeight || 64}px`,
          width: open ? 240 : 56,
          boxSizing: 'border-box',
          backgroundColor: siteConfig.sidebarColor || siteConfig.primaryColor,
          color: 'black',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Header / Toggle */}
      <Box
        sx={{
          p: open ? 2 : 1,
          display: 'flex',
          justifyContent: open ? 'space-between' : 'center',
          alignItems: 'center'

        }}
      >
        {open ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Menu
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'black' }} size="small">
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <Tooltip title="Expand Menu" placement="right" arrow>
            <IconButton onClick={onClose} sx={{ color: 'black' }} size="small">
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ p: 0 }}>
        {siteConfig.navLinks.map((link) => {
          const linkPath = `/${path}/${link.href}`;
          return (
            <Tooltip
              key={link.label}
              title={!open ? link.label : ''}
              placement="right"
              arrow
            >
              <ListItem
                component={RouterLink}
                to={linkPath}
                sx={{
                  py: 1.5,
                  px: open ? 3 : 1,
                  justifyContent: open ? 'flex-start' : 'center',
                  backgroundColor: isActivePath(linkPath) ? '#e0f2fe' : 'transparent',
                  borderLeft: isActivePath(linkPath)
                    ? '4px solid #3b82f6'
                    : '4px solid transparent',
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                    borderLeft: open ? '4px solid #94a3b8' : '4px solid transparent',
                  },
                  transition: 'all 0.2s ease-in-out',
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  color: isActivePath(linkPath) ? '#3b82f6' : 'inherit',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 0,
                    justifyContent: 'center',
                    color: isActivePath(linkPath) ? '#3b82f6' : 'inherit',
                  }}
                >
                  {link.icon === 'Home' ? <HomeIcon /> :
                    link.icon === 'Info' ? <InfoIcon /> :
                      link.icon === 'Computer' ? <ComputerIcon /> :
                        link.icon === 'Code' ? <CodeIcon /> :
                          link.icon === 'Mail' ? <MailIcon /> :
                            link.icon === 'Devices' ? <DevicesIcon /> :
                              link.icon === 'Checklist' ? <ChecklistIcon /> :
                                link.icon === 'Business' ? <BusinessIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={open ? link.label : ''} />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
}
