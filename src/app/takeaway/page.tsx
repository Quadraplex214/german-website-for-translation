export const metadata = {
  title: "Zum Mitnehmen | Gasthaus München",
  description: "Bestellen Sie deutsche Klassiker zum Mitnehmen im Gasthaus München.",
};

export default function TakeawayPage() {
  return (
    <main className="min-h-screen bg-neutral-100 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.7fr,1.3fr]">
          <aside className="rounded-[2rem] bg-amber-500 p-8 text-neutral-950">
            <p className="font-black uppercase tracking-[0.35em]">Zum Mitnehmen</p>
            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Gasthaus-Klassiker für zuhause.
            </h1>
          </aside>
          <div className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-neutral-900">
            <div className="grid gap-5 md:grid-cols-3">
              {["Online auswählen", "Zeitfenster buchen", "Warm abholen"].map((step, index) => (
                <div key={step} className="border-l-4 border-amber-500 pl-5">
                  <p className="text-sm font-black text-amber-600">Schritt {index + 1}</p>
                  <h2 className="mt-2 text-2xl font-black dark:text-white">{step}</h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    Verpackt in stabilen Boxen mit separaten Soßen und Beilagen.
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded-3xl bg-neutral-950 p-6 text-white">
              Besonders beliebt: Schnitzelbox, Brotzeitbrett und Familienbraten
              für vier Personen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
