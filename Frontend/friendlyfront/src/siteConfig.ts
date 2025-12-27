
export type SiteKey = 'software' | 'guidance' | 'itsupport' | 'flowsupport';

export interface SiteConfig {
    name: string;
    logo: string;
    primaryColor: string;
    navLinks: {
        label: string; href: string, icon: string, isTopLevel?: boolean;

    }[];
    heroTitle: string;
    heroSubtitle: string;

    headerHeight?: number;
    headerTextColor?: string;
    headerBgShade?: string;       // Darker / lighter variant of primary
    logoWidth?: number;
    logoHeight?: number;
    sidebarColor?: string;
}

export const sites: Record<SiteKey, SiteConfig> = {
    software: {
        name: 'Digital Software Solutions',
        logo: process.env.PUBLIC_URL + '/logos/nordisklogo.png',
        primaryColor: '#757575',

        navLinks: [
            { label: 'Home', href: 'home', icon: 'Home', isTopLevel: false },
            { label: 'About Us', href: 'about', icon: 'Info', isTopLevel: false },
            { label: 'Services', href: 'services', icon: 'Devices', isTopLevel: false },
            { label: 'Facilities', href: 'facilities', icon: 'Business', isTopLevel: false },
            { label: 'Contact', href: 'contact', icon: 'Mail', isTopLevel: false },
        ],
        heroTitle: 'Innovative Software Solutions for Your Business',
        heroSubtitle: 'Custom software development, cloud services, and digital transformation.',
        headerHeight: 120,
        headerTextColor: '#FFFFFF',
        headerBgShade: '#616161',
        logoWidth: 180,
        logoHeight: 180,
        sidebarColor: '#616161',
    },
    guidance: {
        name: 'Student Admission Guidance',
        logo: process.env.PUBLIC_URL + '/logos/nordisklogo.png',
        primaryColor: '#757575', // blue

        navLinks: [
            { label: 'Home', href: 'home', icon: 'Home', isTopLevel: false },
            { label: 'Requirements', href: 'require', icon: 'Checklist', isTopLevel: false },
            { label: 'Facilities', href: 'facilities', icon: 'Business', isTopLevel: false },
            { label: 'About Us', href: 'about', icon: 'Info', isTopLevel: false },
            { label: 'Contact', href: 'contact', icon: 'Mail', isTopLevel: false },
        ],
        heroTitle: 'Study and Build Your Future in Denmark',
        heroSubtitle: 'Guidance for admission, visa, and job opportunities.',

        headerHeight: 80,
        headerTextColor: '#FFFFFF',
        headerBgShade: 'cadetblue',
        logoWidth: 180,
        logoHeight: 180,
        sidebarColor: 'cadetblue',
    },

    itsupport: {
        name: 'Where Technology Meets Reliability',
        logo: process.env.PUBLIC_URL + '/logos/nordisk.png',
        primaryColor: '#3c3c3c',
        navLinks: [
            { label: 'Home', href: 'home', icon: 'Home', isTopLevel: true },
            { label: 'IT Support', href: 'itservices', icon: 'Computer', isTopLevel: true },
            { label: 'Software Solutions', href: 'swservices', icon: 'Code', isTopLevel: true },
            { label: 'Data Engineering', href: 'dataservices', icon: 'Storage', isTopLevel: true },
            { label: 'Contact', href: 'contact', icon: 'Mail', isTopLevel: true },
            { label: 'Careers', href: 'careers', icon: 'Career', isTopLevel: true },
            { label: 'About Us', href: 'about', icon: 'Info', isTopLevel: true }

        ],
        heroTitle: 'Professional IT & Network Support',
        heroSubtitle: 'Reliable, affordable, and fast tech support for your business.',

        headerHeight: 90,
        headerTextColor: '#FFFFFF',
        headerBgShade: 'cadetblue',
        logoWidth: 85,
        logoHeight: 85,

        sidebarColor: 'white',
    },

    flowsupport: {
        name: 'Flow & Hygiene Support Services',
        logo: process.env.PUBLIC_URL + '/logos/nordisklogo.png',
        primaryColor: '#0D9488', // blue
        navLinks: [
            { label: 'Home', href: 'home', icon: 'Home', isTopLevel: false },
            { label: 'Services', href: 'services', icon: 'Devices', isTopLevel: false },
            { label: 'About', href: 'about', icon: 'Info', isTopLevel: false },
            { label: 'Contact', href: 'contact', icon: 'Mail', isTopLevel: false },
        ],
        heroTitle: 'Restaurant & Facility Hygiene Operations',
        heroSubtitle: 'Professional dishwashing, cleaning, and back-of-house flow support.',

        headerHeight: 90,
        headerTextColor: '#FFFFFF',
        headerBgShade: 'cadetblue',
        logoWidth: 180,
        logoHeight: 180,
        sidebarColor: 'white',
    },
};
