import React, { createContext, useContext, useState, useEffect } from 'react';

const ResponsiveContext = createContext<{ isMobile: boolean }>({ isMobile: false });

export const ResponsiveProvider: React.FC<{ breakpoint: number; children: React.ReactNode }> = ({ breakpoint, children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return (
        <ResponsiveContext.Provider value={{ isMobile }}>
            {children}
        </ResponsiveContext.Provider>
    );
};

export const useResponsive = () => useContext(ResponsiveContext);
