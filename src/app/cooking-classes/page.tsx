export const metadata = {
  title: "Kochkurse | Gasthaus München",
  description: "Praxisnahe Kochkurse für deutsche Küche im Gasthaus München.",
};

export default function CookingClassesPage() {
  return (
    <main className="min-h-screen bg-orange-50 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.45em] text-orange-600">
              Kochschule
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl dark:text-white">
              Lernen Sie Knödel drehen, Soßen ziehen und Strudel falten.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700 dark:text-neutral-300">
              Kleine Kurse mit viel Praxis: Messerarbeit, Teiggefühl,
              Warenkunde und ein gemeinsames Essen zum Abschluss.
            </p>
          </div>
          <div className="rounded-[2rem] bg-orange-600 p-8 text-white">
            <h2 className="text-3xl font-black">3 Stunden</h2>
            <div className="mt-8 space-y-4">
              {["Begrüßung & Aperitif", "Gemeinsames Kochen", "Menü am großen Tisch"].map((step) => (
                <p key={step} className="rounded-2xl bg-white/15 p-4 font-bold">{step}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
