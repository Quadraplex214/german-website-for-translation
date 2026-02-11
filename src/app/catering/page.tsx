"use client";

import Navbar from "@/components/navbar";
import { Truck, UtensilsCrossed, Globe2, CheckCircle2 } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const cateringFeatures = [
  {
    icon: UtensilsCrossed,
    title: "Authentische Küche außer Haus",
    description:
      "Wir bringen klassische deutsche Gerichte wie Schweinebraten, Bratwürste und vegetarische Schmankerl direkt zu Ihrem Event.",
  },
  {
    icon: Truck,
    title: "Flexible Lieferung in München",
    description:
      "Ob Büro, Eventlocation oder privat zu Hause – wir liefern pünktlich und sorgen für einen reibungslosen Ablauf.",
  },
  {
    icon: Globe2,
    title: "Mehrsprachige Betreuung",
    description:
      "Auf Wunsch stellen wir zweisprachige Menükarten (Deutsch/Englisch) zur Verfügung – ideal für internationale Gäste.",
  },
];

const cateringPackages = [
  {
    name: "Bayerische Brotzeit",
    description:
      "Rustikale Platten mit Wurst- und Käsespezialitäten, Obazda, Radi, Brezn und frischem Brot – ideal für Stehempfänge.",
    persons: "ab 15 Personen",
  },
  {
    name: "Warmes Buffet »Alpenklassiker«",
    description:
      "Auswahl an warmen Hauptgerichten mit Beilagen, z. B. Schweinebraten, vegetarische Knödelgerichte und saisonales Gemüse.",
    persons: "ab 25 Personen",
  },
  {
    name: "Feierliches Menü",
    description:
      "Mehrgängiges Menü mit Suppe, Hauptgang und Dessert, individuell nach Ihren Wünschen zusammengestellt.",
    persons: "ab 20 Personen",
  },
];

export default function CateringPage() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 space-y-16">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-4 py-1 text-xs md:text-sm font-medium text-amber-700 dark:text-amber-300">
              <Truck className="h-4 w-4" />
              Catering & außer Haus
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
              Gasthaus-Genuss bei{" "}
              <span className="text-amber-600 dark:text-amber-400">
                Ihnen vor Ort
              </span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg leading-relaxed">
              Sie planen ein Event außerhalb unseres Restaurants? Mit unserem
              Catering-Service bringen wir bayerische Gastfreundschaft und
              authentische Küche zu Ihnen – inklusive Beratung und
              Menüvorschlägen.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-8 md:grid-cols-3">
            {cateringFeatures.map((feature) => (
              <BackgroundGradient
                key={feature.title}
                className="rounded-2xl p-6 bg-white dark:bg-neutral-950 space-y-4 h-full"
              >
                <feature.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <h2 className="text-lg font-semibold">{feature.title}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {feature.description}
                </p>
              </BackgroundGradient>
            ))}
          </div>

          {/* Packages + info */}
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-start">
            <BackgroundGradient className="rounded-2xl p-6 md:p-7 bg-white dark:bg-neutral-950 space-y-5">
              <h2 className="text-2xl font-semibold mb-1">Beispiel-Pakete</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Unsere Pakete dienen als Orientierung – gerne stellen wir ein
                individuelles Angebot nach Ihren Vorstellungen zusammen.
              </p>
              <div className="space-y-4 pt-2">
                {cateringPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="border-b border-neutral-100 dark:border-neutral-800 pb-4 last:border-none last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                          {pkg.description}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-400 whitespace-nowrap">
                        {pkg.persons}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </BackgroundGradient>

            <div className="space-y-4">
              <BackgroundGradient className="rounded-2xl p-6 bg-neutral-900 text-white space-y-3">
                <h3 className="text-lg font-semibold">
                  So erhalten Sie Ihr Angebot
                </h3>
                <p className="text-sm text-neutral-200">
                  Senden Sie uns Ihre Anfrage an{" "}
                  <span className="font-medium">catering@gasthaus-muenchen.de</span>{" "}
                  mit folgenden Angaben:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-200">
                  <li>Datum, Uhrzeit und Veranstaltungsort</li>
                  <li>Art der Veranstaltung (z. B. Stehempfang, Buffet, Menü)</li>
                  <li>Voraussichtliche Personenzahl</li>
                  <li>Gewünschter Budgetrahmen pro Person</li>
                </ul>
                <p className="text-xs text-neutral-400">
                  Wir melden uns in der Regel innerhalb von 2 Werktagen mit
                  einem unverbindlichen Vorschlag.
                </p>
              </BackgroundGradient>

              <div className="rounded-2xl border border-emerald-200/70 dark:border-emerald-800/70 bg-emerald-50/70 dark:bg-emerald-900/20 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <p className="text-sm text-emerald-900 dark:text-emerald-100">
                  Auf Wunsch bieten wir nachhaltige Catering-Optionen mit
                  saisonalen, regionalen Zutaten und Mehrweg- oder
                  Pfandsystemen an.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

