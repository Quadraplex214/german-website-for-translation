"use client";
import React from "react";
import { useLanguage } from "./language-provider";

export default function LanguageChecker() {
  const websiteLanguage = useLanguage();
  console.log(websiteLanguage.language);
  // const languageMap: Record<string, string> = {
  //   "en-us": "English",
  //   "fr-fr": "Français",
  //   "ko-kr": "한국어",
  //   "ja-jp": "日本語",
  //   de: "Deutsch",
  // };

  // const languageName = languageMap[websiteLanguage.language] || "English";
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-blue-800">
              Sprachdienstleistungen
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Die Übersetzung dieser Website ist {websiteLanguage.language}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Entdecken Sie nahtlose mehrsprachige Erfahrungen mit unseren
              professionellen Übersetzungsdiensten. Sprachbarrieren überwinden,
              ein Wort nach dem anderen.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Loslegen
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
              Mehr erfahren
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-muted-foreground">Sprachen</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">99%</div>
              <div className="text-sm text-muted-foreground">Genauigkeit</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">1M+</div>
              <div className="text-sm text-muted-foreground">Übersetzungen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
