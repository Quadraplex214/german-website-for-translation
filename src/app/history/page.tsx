export const metadata = {
  title: "Geschichte | Gasthaus München",
  description: "Die Geschichte des Gasthaus München seit 1952.",
};

export default function HistoryPage() {
  const timeline = [
    ["1952", "Eröffnung als kleines Wirtshaus mit zwölf Tischen."],
    ["1984", "Umbau des Gastraums und Beginn der eigenen Backstube."],
    ["2018", "Neue Küche, alte Rezepte und mehr regionale Produzenten."],
  ];

  return (
    <main className="min-h-screen bg-stone-950 pt-24 text-stone-100">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
          Eine Geschichte aus Holz, Kupfer, Rezeptbüchern und vielen Stammgästen.
        </h1>
        <div className="mt-14 space-y-6">
          {timeline.map(([year, text]) => (
            <article key={year} className="grid gap-4 rounded-[2rem] border border-stone-700 bg-stone-900 p-6 md:grid-cols-[180px,1fr]">
              <p className="text-5xl font-black text-amber-300">{year}</p>
              <p className="text-lg leading-8 text-stone-300">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
