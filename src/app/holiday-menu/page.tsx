export const metadata = {
  title: "Festtagsmenü | Gasthaus München",
  description: "Festliche Feiertagsmenüs im Gasthaus München.",
};

export default function HolidayMenuPage() {
  return (
    <main className="min-h-screen bg-red-950 pt-24 text-white">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.45em] text-red-200">
              Festtage
            </p>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Gans, Glanz und warme Gewürze für besondere Tage.
            </h1>
          </div>
          <div className="rounded-[2rem] bg-white p-8 text-red-950">
            <h2 className="text-3xl font-black">Festliches Menü</h2>
            <ol className="mt-6 space-y-4">
              {["Maronensuppe", "Geschmorte Gans mit Rotkohl", "Bratapfel mit Vanille"].map((dish) => (
                <li key={dish} className="rounded-2xl bg-red-50 p-4 font-bold">{dish}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
