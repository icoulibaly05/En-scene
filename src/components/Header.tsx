import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
    { name: "Statistiques", href: "/stats" },
  ];

  return (
    <>
      <header className="bg-gradient-to-b from-blue-900 via-purple-900 to-blue-800 shadow-lg fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo_rbg.png"
              alt="Logo En Scène"
              width={50}
              height={50}
              className="rounded-full shadow-lg"
            />
            <span className="text-xl font-extrabold text-purple-300">
              En Scène
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-200 hover:text-purple-300 font-medium transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Connexion et Inscription */}
          <div className="flex space-x-4">
            <Link
              href="/connexion"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
            >
              Connexion
            </Link>
            <Link
              href="/formulaire_inscription"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold shadow-md"
            >
              Inscription
            </Link>
          </div>
        </div>
      </header>

      {/* Compensation pour le header */}
      <div className="h-[80px]"></div>
    </>
  );
}
