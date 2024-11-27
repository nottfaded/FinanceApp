import React, { createContext, useContext, useState, useEffect } from 'react';
import themeColors from '../config/themeColors';

interface ThemeContextProps {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => setIsDarkTheme((prev) => !prev);

    useEffect(() => {
        const theme = isDarkTheme ? themeColors.dark : themeColors.light;
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(`--${key}-color`, value);
        }

        document.body.style.background = isDarkTheme ? '#121212' : '#ededed'
    }, [isDarkTheme]);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
};