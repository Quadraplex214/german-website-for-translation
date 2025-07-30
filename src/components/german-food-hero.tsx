"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Spotlight } from "./ui/spotlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  ChefHat,
  MapPin,
  Star,
  Clock,
  Award,
  Users,
  Heart,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "./navbar";
import { Button } from "./ui/button";
import { toast } from "sonner";

const testimonials = [
  {
    quote:
      "Das beste Schnitzel, das ich je gegessen habe! Authentische deutsche Aromen, die einen direkt nach Bayern versetzen.",
    name: "Maria Schmidt",
    title: "Gastronomiekritikerin",
  },
  {
    quote:
      "Hervorragender Sauerbraten und die herzlichste Atmosphäre. Dieser Ort fühlt sich wie zu Hause an.",
    name: "Hans Müller",
    title: "Stammgast",
  },
  {
    quote:
      "Unglaubliche Aufmerksamkeit für traditionelle Rezepte. Jedes Gericht erzählt eine Geschichte des deutschen Erbes.",
    name: "Anna Weber",
    title: "Köchin & Food-Bloggerin",
  },
  {
    quote:
      "Die Brezeln werden täglich frisch gebacken und die Bierauswahl ist phänomenal. Prost!",
    name: "Klaus Fischer",
    title: "Bierliebhaber",
  },
];

const dishes = [
  {
    name: "Wiener Schnitzel",
    description:
      "Knuspriges paniertes Kalbsschnitzel serviert mit Zitrone und traditionellen Beilagen",
    price: "24€",
    image: "/food3.jpeg",
  },
  {
    name: "Sauerbraten",
    description:
      "Traditioneller Schmorbraten, tagelang in Wein und Gewürzen mariniert",
    price: "22€",
    image: "/food4.jpg",
  },
  {
    name: "Bratwurst-Teller",
    description: "Verschiedene deutsche Würste mit Sauerkraut und Senf",
    price: "18€",
    image: "/food5.jpeg",
  },
];

export default function GermanHeroFood() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const menuInView = useInView(menuRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <div
        id="home"
        ref={heroRef}
        className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center pt-16"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="container px-4 md:px-6 relative z-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ChefHat className="h-4 w-4" />
                  Authentische Deutsche Küche
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-50 dark:to-neutral-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Schmecken Sie das Herz{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    Deutschlands
                  </span>
                </motion.h1>

                <motion.p
                  className="max-w-[600px] text-neutral-600 dark:text-neutral-300 md:text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Erleben Sie authentische deutsche Aromen mit unseren
                  traditionellen Rezepten, die über Generationen weitergegeben
                  wurden. Von herzhaftem Sauerbraten bis zu knusprigem Schnitzel
                  - entdecken Sie das reiche kulinarische Erbe Deutschlands.
                </motion.p>
              </div>

              <motion.div
                className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <MapPin className="h-4 w-4" />
                <span>Traditionelle Rezepte seit 1952</span>
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Speisekarte ansehen
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-600/50 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 px-8 bg-transparent backdrop-blur-sm"
                  onClick={() => {
                    toast("Reservierung erfolgreich!");
                  }}
                >
                  Tisch reservieren
                </Button>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-8 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[
                  { number: "50+", label: "Traditionelle Gerichte" },
                  { number: "25", label: "Jahre Erfahrung" },
                  { number: "1000+", label: "Zufriedene Gäste" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <div className="relative">
                  <Image
                    src="/food1.jpg"
                    width="500"
                    height="600"
                    alt="Traditioneller deutscher Speiseplatte"
                    className="aspect-[5/6] overflow-hidden rounded-2xl object-cover"
                  />

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-2xl border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <ChefHat className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          Küchenchef Spezialität
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          Wiener Schnitzel
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -top-4 -right-4 bg-white dark:bg-zinc-800 rounded-xl p-3 shadow-2xl border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Täglich frisch
                      </span>
                    </div>
                  </motion.div>
                </div>
              </BackgroundGradient>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-24 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-neutral-950 dark:to-neutral-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
              Unsere Geschichte
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Drei Generationen authentischer deutscher Kochkunst
            </p>
          </motion.div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  1952 von Heinrich Müller gegründet, serviert unser Restaurant
                  seit über sieben Jahrzehnten authentische deutsche Küche. Was
                  als kleine Familienküche begann, ist zu einer beliebten
                  Institution gewachsen, die traditionelle Rezepte und Techniken
                  bewahrt, die über Generationen weitergegeben wurden.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  {[
                    {
                      icon: Award,
                      title: "Preisgekrönt",
                      desc: "Bestes deutsches Restaurant 2023",
                    },
                    {
                      icon: Users,
                      title: "Familiengeführt",
                      desc: "Drei Generationen stark",
                    },
                    {
                      icon: Heart,
                      title: "Mit Liebe gemacht",
                      desc: "Traditionelle Rezepte",
                    },
                    {
                      icon: Utensils,
                      title: "Täglich frisch",
                      desc: "Regionale Zutaten",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image
                  src="/interior1.jpg"
                  width="600"
                  height="500"
                  alt="Traditionelles deutsches Restaurant Interieur"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section
        id="menu"
        ref={menuRef}
        className="py-24 bg-white dark:bg-neutral-950"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={menuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 dark:from-neutral-50 dark:to-neutral-300">
              Unsere Spezialitäten
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Entdecken Sie unsere beliebtesten traditionellen deutschen
              Gerichte
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dishes.map((dish, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                animate={menuInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <BackgroundGradient className="rounded-[22px] p-4 bg-white dark:bg-zinc-900">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <Image
                      src={dish.image || "/placeholder.svg"}
                      width="400"
                      height="300"
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {dish.name}
                      </h3>
                      <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {dish.description}
                    </p>
                  </div>
                </BackgroundGradient>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-24 bg-gradient-to-br from-neutral-900 to-black dark:from-neutral-950 dark:to-black"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Was unsere Gäste sagen
            </h2>
            <p className="text-xl text-neutral-300">
              Hören Sie von unseren zufriedenen Kunden über ihr authentisches
              deutsches Speiseerlebnis
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        id="contact"
        className="bg-neutral-900 dark:bg-black text-white py-16"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold">Gasthaus München</h3>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Authentische deutsche Küche serviert mit Leidenschaft und
                Tradition seit 1952. Erleben Sie den wahren Geschmack
                Deutschlands.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">@</span>
                </div>
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-400">
                Schnellzugriff
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#menu"
                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    Unsere Speisekarte
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    Über uns
                  </a>
                </li>
                <li>
                  <a
                    href="#reservations"
                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    Reservierungen
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    Private Veranstaltungen
                  </a>
                </li>
                <li>
                  <a
                    href="#catering"
                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    Catering
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-400">
                Kontaktinformationen
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="text-neutral-300">Bayerische Straße 123</h4>
                    <h4 className="text-neutral-300">
                      80331 München, Deutschland
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <span className="text-amber-400">📞</span>
                  </div>
                  <p className="text-neutral-300">+49 89 123 4567</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <span className="text-amber-400">✉️</span>
                  </div>
                  <p className="text-neutral-300">info@gasthaus-muenchen.de</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-400">
                Öffnungszeiten
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-300">Montag - Donnerstag</span>
                  <span className="text-neutral-300">11:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-300">Freitag - Samstag</span>
                  <span className="text-neutral-300">11:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-300">Sonntag</span>
                  <span className="text-neutral-300">12:00 - 21:00</span>
                </div>
                <div className="mt-4 p-3 bg-amber-600/10 rounded-lg border border-amber-600/20">
                  <p className="text-amber-400 text-sm font-medium">
                    Küche schließt 1 Stunde vor Geschäftsschluss
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-neutral-400 text-sm">
                © 2024 Gasthaus München. Alle Rechte vorbehalten. | Gegründet
                1952
              </p>
              <div className="flex gap-6 text-sm">
                <a
                  href="#privacy"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Datenschutz
                </a>
                <a
                  href="#terms"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  AGB
                </a>
                <a
                  href="#cookies"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Cookie-Richtlinie
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
