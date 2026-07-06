export const metadata = {
  title: "Markt & Produzenten | Gasthaus München",
  description: "Lokale Lieferanten und Marktzutaten für das Gasthaus München.",
};

export default function FarmersMarketPage() {
  return (
    <main className="min-h-screen bg-emerald-50 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="rounded-[3rem] bg-emerald-900 p-8 text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.45em] text-emerald-200">
            Unsere Produzenten
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Was morgens am Markt liegt, prägt abends die Karte.
          </h1>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {["Gärtnerei Isargrün", "Metzgerei Huber", "Käserei Alpenrand", "Imkerei Lechner"].map((partner) => (
            <article key={partner} className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-neutral-900">
              <h2 className="text-xl font-black text-emerald-900 dark:text-emerald-200">{partner}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                Kurze Wege, klare Herkunft und direkte Gespräche über Qualität.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
