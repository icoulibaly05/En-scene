"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts.slice(0, 6)); // Affiche les 6 premiers posts
        } else {
          console.error(
            "Erreur lors de la récupération des posts :",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des posts :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
              href="/"
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
              // Logique de déconnexion (exemple : nettoyage du token, redirection)
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
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-purple-300 text-center mb-6">
          Bienvenue sur En Scène - Partagez vos avis sur les Films et Séries
        </h1>
        {loading ? (
          <p className="text-center text-gray-300">Chargement des posts...</p>
        ) : posts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  {/* Image */}
                  <img
                    src={post.imageUrl || "/images/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white">
                    {post.title}
                  </h3>
                  {/* Content Preview */}
                  <p className="text-sm text-gray-400">
                    {post.content.slice(0, 100)}...
                  </p>
                  {/* Category */}
                  <p className="text-sm text-gray-400 mt-2">
                    Catégorie : {post.category}
                  </p>
                  {/* Link to Full Post */}
                  <Link
                    href={`/posts/${post._id}`}
                    className="text-purple-400 hover:text-purple-500 font-medium mt-2 block"
                  >
                    Lire plus
                  </Link>
                </div>
              ))}
            </div>
            {/* View All Posts Button */}
            <div className="text-center mt-8">
              <Link
                href="/tout"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
              >
                Voir tous les posts
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-300">Aucun post disponible.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 bg-purple-700 text-center text-gray-200">
        © 2024 En Scène. Tous droits réservés.
      </footer>
    </div>
  );
}
