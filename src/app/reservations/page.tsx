"use client";

import { CalendarDays, Users, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReservationsPage() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-orange-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 space-y-16">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-4 py-1 text-xs md:text-sm font-medium text-amber-700 dark:text-amber-300">
              <CalendarDays className="h-4 w-4" />
              Reservierungen & Gruppenanfragen
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
              Ihr Platz im{" "}
              <span className="text-amber-600 dark:text-amber-400">
                Gasthaus München
              </span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg leading-relaxed">
              Ob romantisches Dinner zu zweit, Familienfeier oder
              Firmenveranstaltung – wir sorgen dafür, dass Sie und Ihre Gäste
              sich rundum wohlfühlen.
            </p>
          </div>

          {/* Reservation info grid */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
            {/* Form-like info block (static for now, nice layout for future form) */}
            <div className="space-y-6 bg-white/80 dark:bg-neutral-950/80 border border-amber-100 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">
                Tischanfrage stellen
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                Nutzen Sie dieses Formular als Vorlage für Ihre Anfrage per
                E-Mail oder Telefon. So können wir Ihre Reservierung schnell und
                zuverlässig bestätigen.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Datum
                  </label>
                  <div className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center px-3 text-sm text-neutral-500">
                    TT.MM.JJJJ
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Uhrzeit
                  </label>
                  <div className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center px-3 text-sm text-neutral-500">
                    z. B. 19:00 Uhr
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Personenanzahl
                  </label>
                  <div className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center px-3 text-sm text-neutral-500">
                    z. B. 4 Personen
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Anlass
                  </label>
                  <div className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center px-3 text-sm text-neutral-500">
                    Geburtstag, Geschäftsessen, Familienfeier …
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Besondere Wünsche
                </label>
                <div className="min-h-[80px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-start px-3 py-2 text-sm text-neutral-500">
                  Informationen zu Allergien, Kinderstühlen, Sitzbereich
                  (z. B. Biergarten) oder Menüwünschen
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8">
                  Jetzt telefonisch reservieren
                </Button>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm text-center sm:text-right">
                  Bitte beachten Sie: Reservierungen gelten erst nach
                  Bestätigung durch unser Team als verbindlich.
                </p>
              </div>
            </div>

            {/* Side info */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-neutral-900 text-white p-6 md:p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-amber-400" />
                  <h2 className="text-xl font-semibold">
                    Öffnungszeiten & Kontakt
                  </h2>
                </div>
                <p className="text-sm text-neutral-200">
                  Für kurzfristige Reservierungen (am gleichen Tag) empfehlen
                  wir Ihnen die telefonische Anfrage.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 mt-1 text-amber-400" />
                    <div>
                      <p>Montag – Donnerstag: 11:00 – 22:00 Uhr</p>
                      <p>Freitag – Samstag: 11:00 – 23:00 Uhr</p>
                      <p>Sonntag: 12:00 – 21:00 Uhr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-amber-400" />
                    <p>+49 89 123 4567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-amber-400" />
                    <p>reservierung@gasthaus-muenchen.de</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 dark:bg-neutral-950/80 border border-amber-100 dark:border-neutral-800 p-5 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                <h3 className="font-semibold">
                  Gruppen ab 10 Personen & Menüs
                </h3>
                <p>
                  Für größere Gruppen erstellen wir gerne individuelle
                  Menüs – auch mit mehreren Gängen, Getränkepauschalen oder
                  speziellen bayerischen Themenabenden.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Bitte planen Sie für Gruppenanfragen etwas mehr Vorlaufzeit
                  ein, damit wir ausreichend Plätze und Servicepersonal für Sie
                  einplanen können.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

