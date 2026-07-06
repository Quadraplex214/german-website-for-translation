export const metadata = {
  title: "Weinkeller | Gasthaus München",
  description: "Deutsche und alpine Weinbegleitungen aus dem Keller des Gasthaus München.",
};

export default function WineCellarPage() {
  return (
    <main className="min-h-screen bg-[#250713] pt-24 text-rose-50">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.5em] text-rose-300">
            Kellerkarte
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Riesling, Spätburgunder und alpine Entdeckungen.
          </h1>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <article className="rounded-t-full bg-rose-100 p-8 pt-20 text-rose-950">
            <h2 className="text-2xl font-black">Frisch & Mineralisch</h2>
            <p className="mt-4 leading-7">Mosel-Riesling, Silvaner und Grüner Veltliner zu Fisch, Salat und Brotzeit.</p>
          </article>
          <article className="rounded-[3rem] bg-rose-900 p-8 text-white shadow-2xl shadow-black/30">
            <h2 className="text-2xl font-black">Rot & Rauchig</h2>
            <p className="mt-4 leading-7">Spätburgunder, Blaufränkisch und Cuvées für Braten, Wild und Schmorgerichte.</p>
          </article>
          <article className="rounded-b-full bg-amber-200 p-8 pb-20 text-amber-950">
            <h2 className="text-2xl font-black">Süß & Festlich</h2>
            <p className="mt-4 leading-7">Auslesen, Sekt und Dessertweine für Strudel, Creme und Käse zum Abschluss.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
