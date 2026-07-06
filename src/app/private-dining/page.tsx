export const metadata = {
  title: "Privater Salon | Gasthaus München",
  description: "Private Räume und Eventmenüs im Gasthaus München.",
};

export default function PrivateDiningPage() {
  return (
    <main className="min-h-screen bg-stone-100 pt-24 dark:bg-neutral-950">
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] bg-neutral-950 p-8 text-white lg:col-span-7 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-amber-300">
              Separater Salon
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Privater Salon mit geschlossener Tür und offenem Service.
            </h1>
          </div>
          <div className="rounded-[2rem] bg-amber-500 p-8 text-neutral-950 lg:col-span-5">
            <h2 className="text-3xl font-black">Bis 28 Gäste</h2>
            <p className="mt-4 leading-7">
              Ideal für Vorstände, Geburtstage, kleine Hochzeiten und diskrete
              Geschäftsessen mit abgestimmtem Menü.
            </p>
          </div>
          {["Menükarten mit Logo", "Aperitif-Empfang", "Weinbegleitung"].map((item) => (
            <div key={item} className="rounded-[2rem] bg-white p-7 shadow-sm lg:col-span-4 dark:bg-neutral-900">
              <h3 className="text-xl font-black dark:text-white">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                Unser Team plant jedes Detail vorab, damit der Abend ruhig und
                souverän abläuft.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
