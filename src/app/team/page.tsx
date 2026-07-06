export const metadata = {
  title: "Team | Gasthaus München",
  description: "Lernen Sie die Menschen hinter dem Gasthaus München kennen.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.45em] text-amber-600">
            Menschen im Haus
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl dark:text-white">
            Das Team, das aus Rezepten Gastfreundschaft macht.
          </h1>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["Lena", "Küchenchefin"],
            ["Matthias", "Restaurantleitung"],
            ["Selma", "Patisserie"],
          ].map(([name, role]) => (
            <article key={name} className="rounded-[2rem] bg-white p-7 shadow-lg dark:bg-neutral-900">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-4xl font-black text-amber-700">
                {name.slice(0, 1)}
              </div>
              <h2 className="mt-6 text-3xl font-black dark:text-white">{name}</h2>
              <p className="mt-1 font-bold text-amber-600">{role}</p>
              <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                Sorgt dafür, dass jeder Teller präzise und jeder Besuch herzlich bleibt.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
