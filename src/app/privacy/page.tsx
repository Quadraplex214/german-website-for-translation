"use client";

import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-amber-50/40 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 max-w-4xl space-y-10">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-4 py-1 text-xs md:text-sm font-medium text-amber-700 dark:text-amber-300">
              <ShieldCheck className="h-4 w-4" />
              Datenschutz
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Datenschutzhinweise für Gäste
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg">
              Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend
              informieren wir Sie in vereinfachter Form darüber, welche Daten wir
              im Rahmen Ihres Restaurantbesuchs und Ihrer Online-Anfragen
              verarbeiten.
            </p>
          </header>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">
              1. Verantwortliche Stelle & Kontakt
            </h2>
            <p>
              Gasthaus München, Bayerische Straße 123, 80331 München, Deutschland
              <br />
              E-Mail: info@gasthaus-muenchen.de
            </p>
          </section>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">
              2. Welche Daten verarbeiten wir?
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Reservierungsdaten (Name, Kontakt, Datum, Uhrzeit,
                Personenanzahl)
              </li>
              <li>
                Kommunikationsdaten (E-Mails, telefonische Anfragen, Nachrichten
                über Kontaktformulare)
              </li>
              <li>
                Technische Daten beim Besuch dieser Website (z. B. IP-Adresse,
                Browserinformationen – in anonymisierter Form)
              </li>
            </ul>
          </section>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">
              3. Zwecke der Datenverarbeitung
            </h2>
            <p>Wir verwenden Ihre Daten insbesondere für folgende Zwecke:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bearbeitung von Reservierungen und Anfragen</li>
              <li>Vorbereitung und Abwicklung von Veranstaltungen und Catering</li>
              <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">
              4. Ihre Rechte als betroffene Person
            </h2>
            <p>
              Sie haben im Rahmen der gesetzlichen Vorgaben insbesondere das
              Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung sowie Widerspruch gegen bestimmte Verarbeitungen Ihrer
              Daten.
            </p>
          </section>

          <section className="space-y-3 text-xs text-neutral-500 dark:text-neutral-400">
            <p>
              Hinweis: Dieser Text dient als beispielhafte Datenschutzerklärung
              für Demonstrationszwecke. Für eine rechtssichere Fassung wenden Sie
              sich bitte an eine juristische Fachstelle oder nutzen Sie einen
              aktuellen Datenschutz-Generator.
            </p>
          </section>
        </section>
      </main>
  );
}

