export const metadata = {
  title: "Nachspeisen | Gasthaus München",
  description: "Süße Klassiker und hausgemachte Desserts im Gasthaus München.",
};

export default function DessertsPage() {
  return (
    <main className="min-h-screen bg-pink-50 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
          <div className="rounded-[3rem] bg-pink-200 p-8 text-pink-950 md:p-12">
            <p className="font-black uppercase tracking-[0.35em]">Süße Karte</p>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Strudel, Creme und Puderzuckerwolken.
            </h1>
          </div>
          <div className="space-y-4">
            {[
              ["Apfelstrudel", "Zimtäpfel, Rosinen, Vanillesoße"],
              ["Kaiserschmarrn", "Zwetschgenröster, karamellisierte Mandeln"],
              ["Bayerische Creme", "Beerenkompott, Minze, Sahne"],
            ].map(([name, detail]) => (
              <div key={name} className="rounded-[2rem] bg-white p-6 shadow-md shadow-pink-100 dark:bg-neutral-900 dark:shadow-none">
                <h2 className="text-2xl font-black text-pink-900 dark:text-pink-200">{name}</h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
