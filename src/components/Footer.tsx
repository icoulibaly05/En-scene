import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  name: string;
  href: string;
}

export default function Footer() {
  const navLinks: NavLink[] = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <i className="fab fa-facebook text-xl hover:text-blue-500 transition-colors"></i>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <i className="fab fa-twitter text-xl hover:text-blue-400 transition-colors"></i>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <i className="fab fa-instagram text-xl hover:text-pink-500 transition-colors"></i>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-blue-900 to-purple-900 text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/logo_rbg.png"
                alt="Logo En Scène"
                width={60}
                height={60}
                className="rounded-full shadow-md"
              />
              <h3 className="text-2xl font-bold text-white font-serif">
                En Scène
              </h3>
            </Link>
            <p className="text-sm mt-4 text-gray-400 text-center md:text-left">
              Plongez dans l'univers du cinéma et des séries avec nous.
            </p>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h4>
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Réseaux sociaux */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Suivez-nous
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="w-full h-px bg-gray-700 my-6"></div>

        {/* Section Copyright */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} En Scène. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
