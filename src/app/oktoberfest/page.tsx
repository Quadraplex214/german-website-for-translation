export const metadata = {
  title: "Oktoberfest | Gasthaus München",
  description: "Oktoberfest-Wochen im Gasthaus München.",
};

export default function OktoberfestPage() {
  return (
    <main className="min-h-screen bg-blue-700 pt-24 text-white">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="rounded-[3rem] border-8 border-white bg-[repeating-linear-gradient(45deg,#1d4ed8_0,#1d4ed8_24px,#ffffff_24px,#ffffff_48px)] p-4">
          <div className="rounded-[2.5rem] bg-blue-700/95 p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-blue-100">
              Wiesn Wochen
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
              Maßkrüge, Festplatten und bayerische Stimmung ohne Gedränge.
            </h1>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {["Festbier vom Fass", "Hendl & Brezn", "Reservierte Bänke"].map((item) => (
                <p key={item} className="rounded-2xl bg-white p-5 font-black text-blue-800">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
