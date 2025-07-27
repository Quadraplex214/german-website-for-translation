"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "de",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("de"); // Default to 'de' on server

  useEffect(() => {
    // Set initial language from document.documentElement.lang (client-side only)
    const initialLang = document.documentElement.lang || "de";
    console.log("Initial language:", initialLang);
    setLanguage(initialLang);

    // Create MutationObserver to watch for lang attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "lang"
        ) {
          const newLang = document.documentElement.lang || "de";
          console.log("Language changed to:", newLang);
          setLanguage(newLang);
        }
      });
    });

    // Observe <html> element for lang attribute changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    // Cleanup: Disconnect observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
