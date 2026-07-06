"use client";
import { ChefHat, MapPin } from 'lucide-react'

const experienceLinks = [
    { label: "Frühstück", href: "/breakfast" },
    { label: "Biergarten", href: "/beer-garden" },
    { label: "Chef-Tisch", href: "/chef-table" },
    { label: "Weinkeller", href: "/wine-cellar" },
    { label: "Familienessen", href: "/family-dining" },
    { label: "Privater Salon", href: "/private-dining" },
    { label: "Saisonale Spezialitäten", href: "/seasonal-specials" },
    { label: "Nachspeisen", href: "/desserts" },
    { label: "Backstube", href: "/bakery" },
    { label: "Zum Mitnehmen", href: "/takeaway" },
    { label: "Gutscheine", href: "/gift-cards" },
    { label: "Stammgast-Club", href: "/loyalty-club" },
    { label: "Live-Musik", href: "/live-music" },
    { label: "Kochkurse", href: "/cooking-classes" },
    { label: "Markt & Produzenten", href: "/farmers-market" },
    { label: "Festtagsmenü", href: "/holiday-menu" },
    { label: "Oktoberfest", href: "/oktoberfest" },
    { label: "Geschichte", href: "/history" },
    { label: "Team", href: "/team" },
    { label: "Presse", href: "/press" },
];

export default function Footer() {
    return (
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
                                    href="/reservations"
                                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                                >
                                    Reservierungen
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/events"
                                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                                >
                                    Private Veranstaltungen
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/catering"
                                    className="text-neutral-300 hover:text-amber-400 transition-colors"
                                >
                                    Catering
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-amber-400">Kontakt</h4>
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

                <div className="border-t border-neutral-800 mt-12 pt-8">
                    <h4 className="text-lg font-semibold text-amber-400">
                        Weitere Erlebnisse
                    </h4>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {experienceLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="rounded-xl border border-neutral-800 bg-white/5 px-4 py-3 text-sm text-neutral-300 transition-colors hover:border-amber-500/60 hover:text-amber-300"
                            >
                                {link.label}
                            </a>
                        ))}
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
                                href="/privacy"
                                className="text-neutral-400 hover:text-amber-400 transition-colors"
                            >
                                Datenschutz
                            </a>
                            <a
                                href="/terms"
                                className="text-neutral-400 hover:text-amber-400 transition-colors"
                            >
                                AGB
                            </a>
                            <a
                                href="/cookies"
                                className="text-neutral-400 hover:text-amber-400 transition-colors"
                            >
                                Cookie-Richtlinie
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
