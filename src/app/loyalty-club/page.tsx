export const metadata = {
  title: "Stammgast-Club | Gasthaus München",
  description: "Werden Sie Mitglied im Stammgast-Club des Gasthaus München.",
};

export default function LoyaltyClubPage() {
  return (
    <main className="min-h-screen bg-black pt-24 text-white">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
          <div className="rounded-[3rem] bg-gradient-to-br from-amber-400 to-orange-600 p-8 text-black md:p-12">
            <p className="font-black uppercase tracking-[0.4em]">Stammgast Club</p>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Mehr vom Gasthaus für unsere liebsten Gäste.
            </h1>
          </div>
          <div className="grid gap-4">
            {["Geburtstagsdessert", "Vorabzugang zu Events", "Jede 10. Brotzeit gratis"].map((perk) => (
              <div key={perk} className="rounded-[2rem] border border-white/15 bg-white/10 p-7">
                <h2 className="text-2xl font-black text-amber-300">{perk}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  Punkte sammeln Sie automatisch bei Reservierungen und Abholung.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
