"use client";

import Navbar from "@/components/navbar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Utensils, Beer, Soup, CakeSlice, Leaf, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const hotDishes = [
  {
    name: "Rinderroulade nach Hausrezept",
    description:
      "Zart geschmorte Rinderroulade mit Speck, Zwiebeln und Gewürzgurken, serviert mit Rotkohl und Kartoffelklößen.",
    price: "26€",
    tag: "Hausklassiker",
  },
  {
    name: "Schweinekrustenbraten",
    description:
      "Knuspriger Schweinsbraten mit dunkler Biersoße, Sauerkraut und Brezenknödeln.",
    price: "23€",
    tag: "Ofenfrisch",
  },
  {
    name: "Grillplatte »Bayerischer Abend«",
    description:
      "Variation aus Bratwurst, Leberkäse und Schweinenackensteak, dazu Bratkartoffeln und Krautsalat.",
    price: "28€",
    tag: "Für den großen Hunger",
  },
];

const starters = [
  {
    name: "Bayerische Brotzeit",
    description:
      "Verschiedene Käse- und Wurstspezialitäten, Radi, Obazda und frisch gebackene Brezn.",
    price: "15€",
  },
  {
    name: "Leichte Gurkensuppe",
    description:
      "Feine kalte Gurkensuppe mit Dill und Crème fraîche – ideal als sommerlicher Einstieg.",
    price: "9€",
  },
  {
    name: "Hausgemachte Leberknödelsuppe",
    description:
      "Kräftige Rinderbouillon mit zartem Leberknödel und Schnittlauch.",
    price: "8€",
  },
];

const desserts = [
  {
    name: "Apfelstrudel",
    description:
      "Warmer Strudel mit Zimtäpfeln und Rosinen, serviert mit Vanillesoße oder Eis.",
    price: "9€",
  },
  {
    name: "Kaiserschmarrn",
    description:
      "Locker zerrupfter Pfannkuchen mit Puderzucker und Zwetschgenröster zum Teilen.",
    price: "11€",
  },
  {
    name: "Bayerische Crème",
    description:
      "Leichtes Vanille-Dessert mit Beerenkompott und karamellisierten Mandeln.",
    price: "10€",
  },
];

const beverages = [
  {
    name: "Münchner Helles vom Fass",
    description:
      "Feinmalziges Lagerbier von lokalen Brauereien, perfekt zu deftigen Speisen.",
    price: "0,5l · 5,20€",
  },
  {
    name: "Weißbier",
    description:
      "Klassisches bayerisches Weizenbier – naturtrüb oder kristallklar erhältlich.",
    price: "0,5l · 5,40€",
  },
  {
    name: "Hausgemachte Limonaden",
    description:
      "Täglich frisch zubereitet, z. B. Holunder-Zitrone, Himbeere oder Gurke-Minze.",
    price: "0,4l · 4,80€",
  },
];

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-black pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 space-y-16">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 dark:bg-amber-900/40 px-4 py-1 text-xs md:text-sm font-medium text-amber-700 dark:text-amber-300">
              <Utensils className="h-4 w-4" />
              Unsere vollständige Speisekarte
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
              Traditionelle Gerichte mit{" "}
              <span className="text-amber-600 dark:text-amber-400">
                moderner Note
              </span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 md:text-lg leading-relaxed">
              In unserer Karte vereinen wir Klassiker der deutschen Küche mit
              leichten, saisonalen Kreationen. Alle Speisen werden frisch
              zubereitet – mit regionalen Zutaten und viel Liebe zum Detail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                Tagesempfehlungen anfragen
              </Button>
              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
                Für Allergiker stellen wir gerne individuelle Empfehlungen
                zusammen – sprechen Sie unser Service-Team einfach an.
              </p>
            </div>
          </div>

          {/* Sections grid */}
          <div className="grid gap-10 lg:gap-12">
            {/* Starters & Salads */}
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Soup className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    Vorspeisen & Suppen
                  </h2>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  Perfekt zum Ankommen und Teilen am Tisch – von der leichten
                  Suppe bis zur herzhaften Brotzeit.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {starters.map((item) => (
                    <BackgroundGradient
                      key={item.name}
                      className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-neutral-950 h-full flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="font-semibold text-amber-700 dark:text-amber-400">
                          {item.price}
                        </span>
                      </div>
                    </BackgroundGradient>
                  ))}
                </div>
              </div>

              <BackgroundGradient className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-neutral-950 space-y-4">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-lg">
                    Vegetarische Alternativen
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Viele Gerichte können wir auf Wunsch vegetarisch oder
                  flexitarisch zubereiten – zum Beispiel mit gebackenem
                  Blumenkohl oder Käsekrainer-Alternativen. Fragen Sie unser
                  Service-Team nach den tagesaktuellen Empfehlungen.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Kennzeichnung von Allergenen und Zusatzstoffen finden Sie in
                  unserer ausführlichen Kartenübersicht im Restaurant.
                </p>
              </BackgroundGradient>
            </div>

            {/* Main dishes */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Flame className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    Hauptgerichte & Klassiker
                  </h2>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
                  Deftige Schmankerl aus der Pfanne und aus dem Ofen – perfekt
                  mit einem frisch gezapften Bier.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {hotDishes.map((dish) => (
                  <BackgroundGradient
                    key={dish.name}
                    className="rounded-2xl p-5 bg-white dark:bg-neutral-950 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">
                          {dish.name}
                        </h3>
                        {dish.tag ? (
                          <span className="inline-flex items-center rounded-full bg-amber-100/80 dark:bg-amber-900/40 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                            {dish.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">
                        {dish.price}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Auch als kleinere Portion erhältlich
                      </span>
                    </div>
                  </BackgroundGradient>
                ))}
              </div>
            </div>

            {/* Desserts & Drinks */}
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <BackgroundGradient className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-neutral-950 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <CakeSlice className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-2xl font-semibold">Desserts</h2>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Zum süßen Abschluss servieren wir klassische österreichische
                  und bayerische Desserts – frisch aus unserer Küche.
                </p>
                <div className="space-y-4">
                  {desserts.map((dessert) => (
                    <div
                      key={dessert.name}
                      className="flex items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4 last:border-none last:pb-0"
                    >
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">
                          {dessert.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                          {dessert.description}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-400 whitespace-nowrap">
                        {dessert.price}
                      </span>
                    </div>
                  ))}
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-neutral-950 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Beer className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-2xl font-semibold">Getränke</h2>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Von bayerischen Bierspezialitäten bis zu hausgemachten
                  Limonaden – unsere Getränkekarte ergänzt jedes Gericht
                  perfekt.
                </p>
                <div className="space-y-4 mb-4">
                  {beverages.map((bev) => (
                    <div
                      key={bev.name}
                      className="border-b border-neutral-100 dark:border-neutral-800 pb-4 last:border-none last:pb-0"
                    >
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">
                        {bev.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {bev.description}
                      </p>
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-1">
                        {bev.price}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Eine ausführliche Wein- und Spirituosenkarte mit Empfehlungen
                  unseres Service-Teams halten wir im Restaurant für Sie bereit.
                </p>
              </BackgroundGradient>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

