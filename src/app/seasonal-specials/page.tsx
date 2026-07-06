export const metadata = {
  title: "Saisonale Spezialitäten | Gasthaus München",
  description: "Saisonale deutsche Gerichte und limitierte Empfehlungen.",
};

export default function SeasonalSpecialsPage() {
  const seasons = [
    ["Frühling", "Spargel, Kerbel, junge Kartoffeln"],
    ["Sommer", "Pfifferlinge, Tomaten, Kräuterbutter"],
    ["Herbst", "Kürbis, Wild, Preiselbeeren"],
    ["Winter", "Gans, Rotkohl, Maronen"],
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 pt-24 dark:from-neutral-950 dark:via-black dark:to-neutral-900">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl dark:text-white">
            Saisonale Spezialitäten, nur solange der Markt sie hergibt.
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Unsere Wochenkarte richtet sich nach Ernte, Wetter und dem, was die
            Produzenten rund um München besonders frisch liefern.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {seasons.map(([season, ingredients]) => (
            <article key={season} className="rounded-[2rem] border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-5xl font-black text-amber-600">{season.slice(0, 1)}</p>
              <h2 className="mt-6 text-2xl font-black dark:text-white">{season}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{ingredients}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
