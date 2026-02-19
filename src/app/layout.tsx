import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";
import ThemeColorController from "@/components/theme-controller-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gasthaus München - Authentische Deutsche Küche",
  description:
    "Erleben Sie authentische deutsche Aromen mit traditionellen Rezepten seit 1952",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="gasthaus-theme"
          >
            <Navbar />
            {children}
            <Toaster />
            <ThemeColorController />
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
        <Script
          src="website-translation/websiteTranslate.js"
          data-api-key={process.env.NEXT_PUBLIC_TRANSLATOR_API_KEY || "wt_b9ed8167461c4295_zPUY-o__Npqvgakacn13sA"}
          data-disable-auto-browser-translation="true"
        />
      </body>
    </html>
  );
}
