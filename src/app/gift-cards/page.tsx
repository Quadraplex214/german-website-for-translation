export const metadata = {
  title: "Gutscheine | Gasthaus München",
  description: "Verschenken Sie ein kulinarisches Erlebnis im Gasthaus München.",
};

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-white pt-24 dark:from-neutral-950 dark:via-black dark:to-neutral-900">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-5xl rounded-[3rem] border border-red-100 bg-white p-8 shadow-2xl shadow-red-100 md:p-12 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
          <div className="grid gap-8 lg:grid-cols-[1fr,0.8fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.45em] text-red-600">
                Gutschein
              </p>
              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl dark:text-white">
                Verschenken Sie einen Abend am gedeckten Tisch.
              </h1>
            </div>
            <div className="rotate-2 rounded-[2rem] bg-red-600 p-7 text-white shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em]">Gasthaus München</p>
              <p className="mt-10 text-5xl font-black">50€</p>
              <p className="mt-6 text-sm">Einlösbar für Speisen, Getränke und Events.</p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Digital per E-Mail", "Gedruckt im Umschlag", "Individueller Betrag"].map((item) => (
              <p key={item} className="rounded-2xl bg-amber-100 p-5 font-bold text-amber-950">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
