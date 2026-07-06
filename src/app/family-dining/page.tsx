export const metadata = {
  title: "Familienessen | Gasthaus München",
  description: "Familienfreundliches Essen im Gasthaus München.",
};

export default function FamilyDiningPage() {
  return (
    <main className="min-h-screen bg-sky-50 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="rounded-[2.5rem] bg-white p-8 shadow-xl shadow-sky-100 md:p-12 dark:bg-neutral-900 dark:shadow-none">
          <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr]">
            <div>
              <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-800">
                Familien willkommen
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl dark:text-white">
                Ein Tisch, an dem alle Generationen Platz finden.
              </h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Kinderkarte", "Hochstühle", "Ruhige Ecken", "Geteilte Platten"].map((item) => (
                <div key={item} className="rounded-3xl border border-sky-100 bg-sky-50 p-6 dark:border-neutral-700 dark:bg-neutral-800">
                  <h2 className="text-xl font-black text-sky-900 dark:text-sky-200">{item}</h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    Kleine Details, die den Besuch entspannter machen und das Essen
                    für alle angenehm halten.
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-10 rounded-3xl bg-amber-100 p-6 text-lg leading-8 text-amber-950">
            Sonntags servieren wir Familienplatten mit Knödeln, Gemüse, Braten
            und vegetarischen Beilagen direkt in die Tischmitte.
          </p>
        </div>
      </section>
    </main>
  );
}
