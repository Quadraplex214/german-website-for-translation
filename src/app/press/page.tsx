export const metadata = {
  title: "Presse | Gasthaus München",
  description: "Presseinformationen und Medienhinweise zum Gasthaus München.",
};

export default function PressPage() {
  return (
    <main className="min-h-screen bg-zinc-100 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-neutral-900">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-zinc-500">
              Presse
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight dark:text-white">
              Fakten, Stimmen und Bildsprache für Medien.
            </h1>
          </div>
          <div className="grid gap-5">
            {["Kurzprofil", "Pressekontakt", "Bildmaterial"].map((item) => (
              <article key={item} className="rounded-[2rem] border border-zinc-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h2 className="text-2xl font-black dark:text-white">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  Informationen für Artikel, Stadtführer, Food-Features und
                  Veranstaltungsankündigungen.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
