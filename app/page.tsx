"use client";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Gestion des sessions
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession(); // Récupération de l'état de connexion
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session) {
        try {
          const response = await fetch("/api/posts"); // Récupération des posts via l'API
          if (response.ok) {
            const data = await response.json();
            setPosts(data.posts.slice(0, 6)); // Limite initiale : 6 posts
          } else {
            console.error("Erreur lors de la récupération des posts :", await response.text());
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des posts :", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Si pas de session, terminer le chargement
      }
    };

    fetchPosts();
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-blue-800 to-purple-900 text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        {session ? (
          <>
            <h1 className="text-4xl font-extrabold text-purple-300 text-center mb-6">
              🎥 Bienvenue {session.user.name}, découvrez les derniers avis !
            </h1>
            {loading ? (
              <p className="text-center text-gray-300">Chargement des posts...</p>
            ) : posts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
                    >
                      {/* Affichage de l'image */}
                      <img
                        src={post.imageUrl || "/images/placeholder.jpg"} // Placeholder si image manquante
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      {/* Titre */}
                      <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                      {/* Contenu partiel */}
                      <p className="text-sm text-gray-400">{post.content.slice(0, 100)}...</p>
                      {/* Catégorie */}
                      <p className="text-sm text-gray-400 mt-2">Catégorie : {post.category}</p>
                      {/* Lien vers le post complet */}
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-purple-400 hover:text-purple-500 font-medium mt-2 block"
                      >
                        Lire plus
                      </Link>
                    </div>
                  ))}
                </div>
                {/* Bouton pour afficher tous les posts */}
                <div className="text-center mt-8">
                  <Link
                    href="/post"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
                  >
                    Voir tous les posts
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-300">Aucun post disponible.</p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-purple-300 text-center mb-6">
              🎥 Bienvenue sur En Scène - Partagez vos avis sur les Films et Séries
            </h1>
            <p className="text-center text-gray-300 mt-4">
              Connectez-vous pour découvrir les derniers posts et critiques de films et séries !
            </p>
            <div className="text-center mt-6">
              <Link
                href="/connexion"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
              >
                Connexion
              </Link>
              <Link
                href="/formulaire_inscription"
                className="ml-4 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold shadow-md"
              >
                Inscription
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
