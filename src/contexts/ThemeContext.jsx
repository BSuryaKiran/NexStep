import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    // Theme is already applied via inline script in index.html
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Apply theme to document and save to localStorage
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // Temporarily disable transitions during theme switch
    const root = document.documentElement;
    root.classList.add('theme-switching');
    
    // Force synchronous state update to prevent visual glitches
    flushSync(() => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    });
    
    // Re-enable transitions after theme has been applied
    setTimeout(() => {
      root.classList.remove('theme-switching');
    }, 50);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
