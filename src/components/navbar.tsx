"use client";
import { ChefHat, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Startseite", href: "#home" },
    { name: "Über uns", href: "#about" },
    { name: "Speisekarte", href: "#menu" },
    { name: "Bewertungen", href: "#testimonials" },
    { name: "Kontakt", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-amber-600" />
              <span
                className="text-xl font-bold text-neutral-900"
                translate="no"
              >
                Gasthaus München
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="text-neutral-600 hover:text-amber-600 transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-neutral-600">
                <Sun className="h-5 w-5" />
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Reservierung
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-neutral-900 dark:text-white">
              Gasthaus München
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Reservierung
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-neutral-600 dark:text-neutral-300"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-800 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Reservierung
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
