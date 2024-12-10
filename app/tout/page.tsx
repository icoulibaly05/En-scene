"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/post"); // API pour récupérer tous les articles
        if (response.ok) {
          const data = await response.json();
          setArticles(data.posts);
        } else {
          console.error(
            "Erreur lors de la récupération des articles :",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-300">Chargement des articles...</p>
    );
  }

  if (articles.length === 0) {
    return (
      <p className="text-center text-red-500">Aucun article trouvé.</p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-blue-800 to-purple-900 text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-b from-blue-900 via-purple-900 to-blue-800 shadow-lg fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Section: User */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl">👤</span>
            <span className="text-lg font-bold text-white">Marwen35</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/accueil"
              className="text-gray-200 hover:text-purple-300 font-medium transition"
            >
              Accueil
            </Link>
            <Link
              href="/a-propos"
              className="text-gray-200 hover:text-purple-300 font-medium transition"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-gray-200 hover:text-purple-300 font-medium transition"
            >
              Contact
            </Link>
            <Link
              href="/stats"
              className="text-gray-200 hover:text-purple-300 font-medium transition"
            >
              Statistiques
            </Link>
          </nav>

          {/* Logout Button */}
          <button
            onClick={() => {
              console.log("Déconnexion effectuée");
              window.location.href = "/";
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Compensation pour le header */}
      <div className="h-[80px]"></div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              {/* Image */}
              <img
                src={article.imageUrl || "/images/placeholder.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {/* Titre */}
              <h2 className="text-xl font-bold text-white">{article.title}</h2>
              {/* Auteur et Date */}
              <p className="text-sm text-gray-400 mt-2">
                Écrit par : <span className="text-purple-300">{article.author}</span>
              </p>
              <p className="text-sm text-gray-400">
                Publié le : {new Date(article.createdAt).toLocaleDateString()}
              </p>
              {/* Bouton Lire Plus */}
              <div className="mt-4 text-center">
                <Link
                  href={`/posts/${article._id}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
                >
                  Lire Plus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 bg-purple-700 text-center text-gray-200">
        © 2024 En Scène. Tous droits réservés.
      </footer>
    </div>
  );
}
