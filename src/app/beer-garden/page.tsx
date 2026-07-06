export const metadata = {
  title: "Biergarten | Gasthaus München",
  description: "Entdecken Sie den schattigen Biergarten im Gasthaus München.",
};

export default function BeerGardenPage() {
  return (
    <main className="min-h-screen bg-lime-950 pt-24 text-white">
      <section className="relative overflow-hidden px-4 py-20 md:px-6">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,#84cc16_1px,transparent_1px),linear-gradient(#84cc16_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="container relative mx-auto">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-lime-300">
              Hofgarten Saison
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Kastanien, Krüge und lange Abende im Biergarten.
            </h1>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {["120 Plätze", "6 Fassbiere", "Schattenplätze", "Brezn-Bar"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <p className="text-3xl font-black text-lime-200">{item}</p>
                <p className="mt-3 text-sm leading-6 text-lime-50/80">
                  Reservierbar für Gruppen oder spontan für den Feierabend.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-lime-300 p-8 text-lime-950 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr,0.7fr]">
              <div>
                <h2 className="text-3xl font-black">Was draußen besonders gut schmeckt</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8">
                  Helles vom Fass, knuspriger Schweinebraten, Radi, Obazda und
                  ofenfrische Brezn werden direkt an den Tisch gebracht.
                </p>
              </div>
              <div className="rounded-3xl bg-lime-950 p-6 text-white">
                <p className="font-bold text-lime-200">Öffnung bei gutem Wetter</p>
                <p className="mt-2 text-4xl font-black">April bis Oktober</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
