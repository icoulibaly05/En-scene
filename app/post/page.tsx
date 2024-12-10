"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch("/api/posts"); // Récupération de tous les posts
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
        } else {
          console.error("Erreur lors de la récupération des posts :", await response.text());
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des posts :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-blue-800 to-purple-900 text-gray-200">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-purple-300 text-center mb-6">
          Tous les posts
        </h1>
        {loading ? (
          <p className="text-center text-gray-300">Chargement des posts...</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={post.imageUrl || "/images/placeholder.jpg"} // Placeholder si image manquante
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <p className="text-sm text-gray-400">{post.content.slice(0, 100)}...</p>
                <p className="text-sm text-gray-400 mt-2">Catégorie : {post.category}</p>
                <Link
                  href={`/posts/${post.id}`}
                  className="text-purple-400 hover:text-purple-500 font-medium mt-2 block"
                >
                  Lire plus
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">Aucun post disponible.</p>
        )}
      </div>
    </div>
  );
}
