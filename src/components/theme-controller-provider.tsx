"use client";
import { useEffect } from "react";

export default function ThemeColorController() {
  useEffect(() => {
    const meta =
      document.querySelector('meta[name="theme-color"]') ||
      (() => {
        const m = document.createElement("meta");
        m.name = "theme-color";
        document.head.appendChild(m);
        return m;
      })();

    let lastScroll = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        // Scrolling down → make transparent
        meta.setAttribute("content", "transparent");
      } else {
        // Scrolling up → opaque (for example, light gray)
        meta.setAttribute("content", "#f5f5f5");
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
