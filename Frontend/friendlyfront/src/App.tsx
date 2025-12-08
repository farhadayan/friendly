import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import "./styles/global.css";
import "./styles/themes/software.css";

import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { Divider, Box } from "@mui/material";
import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import Header from './components/Header';
import SidebarMenu from './components/SidebarMenu';

import Flow from './components/Flow';
import AdmissionSupport from './components/AdmissionSupport';

import FlowHome from './components/flowsupport/FlowHome';
import FlowServices from './components/flowsupport/FlowServices';
import FlowAbout from './components/flowsupport/FlowAbout';
import FlowContact from './components/flowsupport/FlowContact';

import GuideHome from './components/guidance/GuideHome';
import GuideRequire from './components/guidance/GuideRequire';
import GuideFacilities from './components/guidance/GuideFacilities';
import GuideAbout from './components/guidance/GuideAbout';
import GuideContact from './components/guidance/GuideContact';

import Home from './components/itsupport/Home';
import About from './components/itsupport/About';
import ItSupport from './components/itsupport/ItSupport';
import WebDevelop from './components/softwaresolution/WebDevelop';
import Contact from './components/itsupport/Contact';

import SwHome from './components/softwaresolution/SwHome';
import SwAbout from './components/softwaresolution/SwAbout';
import SwServices from './components/softwaresolution/SwServices';
import SwContact from './components/softwaresolution/SwContact';

function AppRoutes() {
  const { setSite } = useContext(ThemeContext);
  const location = useLocation();

  // Update site based on path
  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path === "software" || path === "guidance" || path === "itsupport" || path === "flowsupport") {
      setSite(path);
    }
  }, [location.pathname, setSite]);

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/software/home" replace />} />

      {/* Software Solution */}
      <Route path="/software/home" element={<SwHome />} />
      <Route path="/software/about" element={<SwAbout />} />
      <Route path="/software/services" element={<SwServices />} />
      <Route path="/software/webdevelop" element={<WebDevelop />} />
      <Route path="/software/facilities" element={<SwServices />} />
      <Route path="/software/contact" element={<SwContact />} />

      {/* Guidance */}
      <Route path="/guidance/home" element={<GuideHome />} />
      <Route path="/guidance/require" element={<GuideRequire />} />
      <Route path="/guidance/facilities" element={<GuideFacilities />} />
      <Route path="/guidance/about" element={<GuideAbout />} />
      <Route path="/guidance/contact" element={<GuideContact />} />

      {/* IT Support */}
      <Route path="/itsupport/home" element={<Home />} />
      <Route path="/itsupport/about" element={<About />} />
      <Route path="/itsupport/services" element={<ItSupport />} />
      <Route path="/itsupport/contact" element={<Contact />} />

      {/* Flow Support */}
      <Route path="/flowsupport/home" element={<FlowHome />} />
      <Route path="/flowsupport/services" element={<FlowServices />} />
      <Route path="/flowsupport/about" element={<FlowAbout />} />
      <Route path="/flowsupport/contact" element={<FlowContact />} />
      <Route path="/flowsupport" element={<Flow />} />
      <Route path="/guidance" element={<AdmissionSupport />} />
      <Route path="/itsupport" element={<ItSupport />} />
      <Route path="/software" element={<SwHome />} />
    </Routes>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarOpenWidth = 250;
  const sidebarClosedWidth = 56;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <SidebarMenu open={isSidebarOpen} onClose={handleSidebarToggle} />
        <Divider />

        {/* Main content dynamically shifted by sidebar width */}
        <Box
          component="main"
          sx={{
            transition: 'margin-left 0.3s ease-in-out',
            ml: isSidebarOpen ? `${sidebarOpenWidth}px` : `${sidebarClosedWidth}px`, // sidebar widths
            //paddingTop: 'var(--header-height, 64px)',
            px: 3,
            backgroundColor: 'var(--body-bg, #f7f7f7)',
            minHeight: '100vh',
          }}
        >
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
