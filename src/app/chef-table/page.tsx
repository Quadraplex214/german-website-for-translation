export const metadata = {
  title: "Chef-Tisch | Gasthaus München",
  description: "Ein Tasting-Erlebnis ganz nah am Küchenteam des Gasthaus München.",
};

export default function ChefTablePage() {
  const courses = ["Gruß aus der Küche", "Waldpilz & Spätzle", "Rind aus Bayern", "Zwetschge & Rahm"];

  return (
    <main className="min-h-screen bg-neutral-950 pt-24 text-white">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr,0.85fr]">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-stone-800 via-neutral-900 to-black p-8 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-amber-400">
              Acht Plätze pro Abend
            </p>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Der Tisch direkt am Pass.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              Beobachten Sie, wie Fonds reduziert, Krusten lackiert und Teller
              final angerichtet werden. Unser Küchenchef erzählt die Geschichte
              hinter jedem Gang.
            </p>
          </div>

          <aside className="rounded-[2.5rem] border border-amber-500/30 bg-amber-500/10 p-8">
            <h2 className="text-2xl font-black text-amber-200">Tasting-Ablauf</h2>
            <div className="mt-8 space-y-5">
              {courses.map((course, index) => (
                <div key={course} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 font-black text-neutral-950">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{course}</h3>
                    <p className="text-sm leading-6 text-neutral-300">
                      Saisonaler Gang mit passender Getränkebegleitung auf Wunsch.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
