"use client";

import { Calendar, PartyPopper, Building2, Wine, Users } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-amber-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 space-y-16">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-4 py-1 text-xs md:text-sm font-medium text-amber-700 dark:text-amber-300">
              <PartyPopper className="h-4 w-4" />
              Private Feiern & Firmen-Events
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
              Feiern im{" "}
              <span className="text-amber-600 dark:text-amber-400">
                Gasthaus München
              </span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg leading-relaxed">
              Vom kleinen Familiengeburtstag bis zum großen Firmenjubiläum – wir
              gestalten Ihr Event mit bayerischem Charme, authentischer Küche
              und persönlichem Service.
            </p>
          </div>

          {/* Event types */}
          <div className="grid gap-8 lg:grid-cols-3">
            <BackgroundGradient className="rounded-2xl p-6 bg-white dark:bg-neutral-950 space-y-3 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                  <Users className="h-4 w-4" />
                  Familienfeiern
                </div>
                <h2 className="text-xl font-semibold">Geburtstage & Jubiläen</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Gemütliche Tische, gemeinsame Platten zum Teilen und ein Service,
                  der sich um alle Generationen kümmert – von den Großeltern bis zu
                  den Kleinsten.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                <li>• Individuelle Menüs oder à la carte</li>
                <li>• Platz für bis zu 40 Personen im Hauptraum</li>
                <li>• Kinderstühle und Kinderspeisekarte verfügbar</li>
              </ul>
            </BackgroundGradient>

            <BackgroundGradient className="rounded-2xl p-6 bg-white dark:bg-neutral-950 space-y-3 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                  <Building2 className="h-4 w-4" />
                  Firmen-Events
                </div>
                <h2 className="text-xl font-semibold">
                  Geschäftsessen & Teamevents
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Idealer Rahmen für entspannte Kundengespräche, Weihnachtsfeiern
                  oder Teambuilding mit typisch bayerischem Menü.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                <li>• Auswahl an Menüvorschlägen für Gruppen</li>
                <li>• Technik für kurze Ansprachen auf Anfrage</li>
                <li>• Rechnung mit Firmenadresse & Pauschalen möglich</li>
              </ul>
            </BackgroundGradient>

            <BackgroundGradient className="rounded-2xl p-6 bg-white dark:bg-neutral-950 space-y-3 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                  <Wine className="h-4 w-4" />
                  Besondere Anlässe
                </div>
                <h2 className="text-xl font-semibold">
                  Hochzeiten & Taufen im kleinen Rahmen
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Für festliche Anlässe bieten wir mehrgängige Menüs, Sektempfang
                  und liebevoll dekorierte Tische.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                <li>• Abstimmung von Dekoration und Farbschema</li>
                <li>• Dessertbuffet oder Hochzeitstorte nach Wunsch</li>
                <li>• Unterstützung bei musikalischer Begleitung</li>
              </ul>
            </BackgroundGradient>
          </div>

          {/* Info + CTA */}
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <h2 className="text-2xl font-semibold">
                  So planen wir Ihr Event
                </h2>
              </div>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Gemeinsam mit Ihnen erstellen wir ein stimmiges Konzept – von
                der Menüfolge über die Getränkeauswahl bis zur Dekoration. Auf
                Wunsch koordinieren wir auch Live-Musik oder besondere
                Programmpunkte und berücksichtigen selbstverständlich
                Unverträglichkeiten und besondere Ernährungsformen.
              </p>
              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                Senden Sie uns einfach Ihre Vorstellungen (Anlass, Datum,
                Personenzahl, Budgetrahmen) – wir melden uns mit einem
                unverbindlichen Vorschlag.
              </p>
            </div>

            <BackgroundGradient className="rounded-2xl p-6 md:p-7 bg-white dark:bg-neutral-950 space-y-4">
              <h3 className="text-lg font-semibold">
                Anfrage für Veranstaltungen
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Schreiben Sie uns eine E-Mail an{" "}
                <span className="font-medium text-amber-700 dark:text-amber-400">
                  events@gasthaus-muenchen.de
                </span>{" "}
                mit folgenden Informationen:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                <li>Anlass der Veranstaltung</li>
                <li>Gewünschtes Datum & Uhrzeit</li>
                <li>Voraussichtliche Personenanzahl</li>
                <li>Besondere Wünsche (Menü, Musik, Dekoration)</li>
              </ul>
              <div className="pt-2">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Vorschlag für Ihr Event anfragen
                </Button>
              </div>
            </BackgroundGradient>
          </div>
        </section>
      </main>
  );
}

