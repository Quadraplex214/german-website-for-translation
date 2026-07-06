export const metadata = {
  title: "Live-Musik | Gasthaus München",
  description: "Abende mit Live-Volksmusik im Gasthaus München.",
};

export default function LiveMusicPage() {
  return (
    <main className="min-h-screen bg-indigo-950 pt-24 text-white">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.5em] text-indigo-200">
            Donnerstags ab 19 Uhr
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Zither, Akkordeon und Stimmen, die den Raum wärmer machen.
          </h1>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {["Stubenmusi", "Jazzige Volkslieder", "Wirtshaus-Chor"].map((show) => (
            <article key={show} className="rounded-[2rem] bg-white p-7 text-indigo-950">
              <p className="text-5xl">♪</p>
              <h2 className="mt-6 text-2xl font-black">{show}</h2>
              <p className="mt-3 text-sm leading-6">
                Kleine Besetzungen, angenehme Lautstärke und viel Atmosphäre
                zwischen Hauptgang und Dessert.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
