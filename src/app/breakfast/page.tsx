export const metadata = {
  title: "Frühstück | Gasthaus München",
  description: "Ein warmes Morgenmenü mit bayerischer Backstube, Kaffee und Brunch-Tellern.",
};

export default function BreakfastPage() {
  const plates = [
    ["Bäckerfrühstück", "Hausbrot, Butter, Honig, Bergkäse und Kräuterquark."],
    ["Weißwurst am Vormittag", "Zwei Weißwürste mit süßem Senf und warmer Brezn."],
    ["Süßer Start", "Kaiserschmarrn-Minute mit Apfelkompott und Zimt."],
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_35%),linear-gradient(135deg,#fff7ed,#ffffff_45%,#fefce8)] pt-24 pb-16 dark:from-neutral-950 dark:to-black">
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] items-center">
          <div className="space-y-7">
            <p className="w-fit rounded-full border border-amber-300 bg-white/70 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm dark:bg-neutral-900 dark:text-amber-300">
              Täglich von 8:00 bis 11:30
            </p>
            <h1 className="text-4xl font-black tracking-tight text-neutral-950 md:text-6xl dark:text-white">
              Frühstück mit goldener Kruste und ruhigem Morgenlicht.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-neutral-700 dark:text-neutral-300">
              Ein gemütlicher Start in München: ofenwarme Brezn, cremiger Kaffee,
              hausgemachte Marmeladen und kleine Teller zum Teilen.
            </p>
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-white/80 p-4 shadow-2xl shadow-amber-200/40 backdrop-blur dark:border-amber-900/50 dark:bg-neutral-950">
            <div className="rounded-[1.5rem] bg-neutral-950 p-6 text-white">
              <div className="grid gap-4 sm:grid-cols-3">
                {plates.map(([name, copy]) => (
                  <article key={name} className="rounded-3xl bg-white/10 p-5">
                    <span className="text-3xl">☀</span>
                    <h2 className="mt-5 text-xl font-bold text-amber-200">{name}</h2>
                    <p className="mt-3 text-sm leading-6 text-neutral-200">{copy}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 rounded-3xl bg-amber-500 p-5 text-neutral-950">
                <p className="text-sm font-bold uppercase tracking-[0.3em]">Morgenangebot</p>
                <p className="mt-2 text-2xl font-black">Kaffee & Brezn für 6,50€</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
