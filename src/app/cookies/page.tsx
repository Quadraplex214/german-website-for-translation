"use client";

export default function CookiesPage() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-amber-50/40 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 max-w-4xl space-y-10">
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Cookie-Richtlinie
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg">
              Auf dieser Website setzen wir – soweit technisch erforderlich – Cookies
              und ähnliche Technologien ein. Nachfolgend erläutern wir deren Zweck in
              vereinfachter Form.
            </p>
          </header>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">1. Technisch notwendige Cookies</h2>
            <p>
              Diese Cookies sind für die Nutzung grundlegender
              Funktionen der Website erforderlich (z. B. Sprachauswahl,
              Seitennavigation) und können nicht deaktiviert werden.
            </p>
          </section>

          <section className="space-y-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <h2 className="text-xl font-semibold">2. Optionale Dienste</h2>
            <p>
              Wenn wir in Zukunft Analyse- oder Marketing-Tools einsetzen,
              informieren wir Sie an dieser Stelle und holen – soweit
              erforderlich – Ihre Einwilligung ein.
            </p>
          </section>

          <section className="space-y-3 text-xs text-neutral-500 dark:text-neutral-400">
            <p>
              Hinweis: Diese Cookie-Richtlinie ist ein Beispieltext für
              Demonstrationszwecke und ersetzt keine individuelle rechtliche
              Beratung.
            </p>
          </section>
        </section>
      </main>
  );
}

