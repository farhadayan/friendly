import React, { createContext, useEffect, useState } from 'react';
import { sites } from '../siteConfig'; // <-- your existing siteConfig.ts

export type SiteKey = keyof typeof sites;

interface ThemeContextType {
  site: SiteKey;
  setSite: (s: SiteKey) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  site: 'software',
  setSite: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [site, setSite] = useState<SiteKey>('software');

  useEffect(() => {
    // Remove previous theme classes
    document.body.classList.remove(
      'theme-software',
      'theme-guidance',
      'theme-itsupport',
      'theme-flowsupport'
    );

    // Add new theme class
    const themeClass = `theme-${site}`;
    document.body.classList.add(themeClass);

    // If site config exists, set CSS variables for dynamic styling
    const cfg = sites[site];
    if (cfg) {
      // ensure headerHeight is px value
      const headerHeightPx = cfg.headerHeight ? `${cfg.headerHeight}px` : '64px';
      document.body.style.setProperty('--header-height', headerHeightPx);

      if (cfg.primaryColor) document.body.style.setProperty('--primary', cfg.primaryColor);
      if (cfg.headerBgShade) document.body.style.setProperty('--header-bg', cfg.headerBgShade);
      if (cfg.headerTextColor) document.body.style.setProperty('--header-text', cfg.headerTextColor);
      if (cfg.logoWidth) document.body.style.setProperty('--logo-width', `${cfg.logoWidth}px`);
      if (cfg.logoHeight) document.body.style.setProperty('--logo-height', `${cfg.logoHeight}px`);
      // body background variable
      document.body.style.setProperty('--body-bg', (document.body.style.getPropertyValue('--body-bg') || '#f7f7f7'));
    }
  }, [site]);

  return (
    <ThemeContext.Provider value={{ site, setSite }}>
      {children}
    </ThemeContext.Provider>
  );
};
