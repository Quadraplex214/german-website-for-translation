"use client";

import Navbar from "@/components/navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-amber-50/40 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 max-w-4xl space-y-10">
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg">
              Nachfolgend finden Sie eine vereinfachte Darstellung typischer
              Regelungen, wie sie in Allgemeinen Geschäftsbedingungen für ein
              Restaurant vorkommen können.
            </p>
          </header>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">
              1. Geltungsbereich & Vertragsabschluss
            </h2>
            <p>
              Diese AGB gelten für Reservierungen, Veranstaltungen und
              Catering-Leistungen im Gasthaus München. Mit Bestätigung einer
              Reservierung oder Annahme eines Angebots kommt ein Vertrag
              zwischen dem Gast und dem Restaurant zustande.
            </p>
          </section>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">2. Reservierungen</h2>
            <p>
              Reservierungen sind in der Regel kostenlos. Wir behalten uns vor,
              Reservierungen bei Nichterscheinen oder kurzfristiger Absage
              (je nach Gruppengröße) mit einer Ausfallpauschale zu berechnen,
              sofern dies im Vorfeld kommuniziert wurde.
            </p>
          </section>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">
              3. Veranstaltungen & Catering
            </h2>
            <p>
              Für Veranstaltungen und Catering-Leistungen gelten die im Angebot
              vereinbarten Konditionen. Änderungen der Personenzahl sollten uns
              rechtzeitig mitgeteilt werden. Kurzfristige Reduzierungen können
              ganz oder teilweise in Rechnung gestellt werden.
            </p>
          </section>

          <section className="space-y-3 text-xs text-neutral-500 dark:text-neutral-400">
            <p>
              Hinweis: Diese AGB dienen als Beispieltext für
              Demonstrationszwecke. Für eine rechtlich verbindliche Fassung
              sollten Sie anwaltliche Beratung in Anspruch nehmen.
            </p>
          </section>
        </section>
      </main>
    </>
  );
}

