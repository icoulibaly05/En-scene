"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Map des auteurs
const authors = {
  "67574df62012c29149d2d22c": "dark_mehdy",
  "67574e3f2012c29149d2d22d": "Gege_La_Solution",
  "6757f099f0752836fe3bbf0e": "Titou_La_Racaille_Du_35",
  "6757fedcf0752836fe3bbf0f": "Desir_Seduction",
};

export default function PostPage() {
  const { id } = useParams(); // Récupère l'ID de l'URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
        } else {
          console.error(
            "Erreur lors de la récupération du post :",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du post :", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?articleId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          console.error(
            "Erreur lors de la récupération des commentaires :",
            await response.text()
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        );
      }
    };

    if (id) {
      fetchPost();
      fetchComments();
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-300">Chargement de l'article...</p>
    );
  }

  if (!post) {
    return (
      <p className="text-center text-red-500">Article non trouvé.</p>
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

      <main className="container mx-auto px-6 py-12">
        {/* Article */}
        <article className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Titre */}
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          {/* Image */}
          <img
            src={post.imageUrl || "/images/placeholder.jpg"}
            alt={post.title}
            className="w-full max-h-48 object-contain rounded-lg mb-6"
          />
          {/* Contenu */}
          <p className="text-lg text-gray-300">{post.content}</p>

          {/* Informations supplémentaires */}
          <div className="mt-6 text-sm text-gray-400 space-y-2">
            {/* Catégorie */}
            <p>
              <span className="font-semibold text-purple-300">Catégorie :</span>{" "}
              {post.category}
            </p>
            {/* Auteur */}
            <p>
              <span className="font-semibold text-purple-300">Auteur :</span>{" "}
              {authors[post.authorId] || "Auteur inconnu"}
            </p>
            {/* Date de publication */}
            <p>
              <span className="font-semibold text-purple-300">Publié le :</span>{" "}
              {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </article>

        {/* Commentaires */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Commentaires
          </h2>
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <p className="text-sm font-bold text-purple-300">
                    {comment.user}
                  </p>
                  <p className="text-gray-200">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">
              Aucun commentaire pour cet article.
            </p>
          )}
        </section>

        {/* Bouton retour */}
        <div className="text-center mt-8">
          <Link
            href="/tout"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-purple-700 text-center text-gray-200">
        © 2024 En Scène. Tous droits réservés.
      </footer>
    </div>
  );
}
