export const metadata = {
  title: "Backstube | Gasthaus München",
  description: "Frisches Brot, Brezn und Gebäck aus der Backstube des Gasthaus München.",
};

export default function BakeryPage() {
  return (
    <main className="min-h-screen bg-[#f7ead8] pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="relative overflow-hidden rounded-[3rem] bg-[#6b3f22] p-8 text-white md:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-300/30" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-amber-200">
              Aus dem Ofen
            </p>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Brotduft noch bevor der erste Tisch gedeckt ist.
            </h1>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Brezn", "Sauerteigbrot", "Nusszopf"].map((item) => (
            <article key={item} className="rounded-[2rem] bg-white p-7 shadow-lg shadow-amber-900/10 dark:bg-neutral-900">
              <h2 className="text-2xl font-black text-[#6b3f22] dark:text-amber-200">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                Täglich frisch gebacken und in kleinen Chargen serviert, damit
                Kruste und Duft genau richtig bleiben.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
