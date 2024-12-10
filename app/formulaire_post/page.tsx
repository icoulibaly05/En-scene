"use client";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Film",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Envoie les données en JSON
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Post créé avec succès !");
        setTimeout(() => {
          window.location.href = "/blog"; // Redirection vers la page des blogs
        }, 2000);
      } else {
        toast.error(result.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      toast.error("Erreur lors de l'envoi des données.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 via-purple-900 to-blue-800">
      <ToastContainer />
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-3xl shadow-lg w-[90%] sm:w-[30rem] md:w-[35rem] lg:w-[40rem]">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-400">
          🎬 Créer un Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div className="relative">
            <label
              htmlFor="title"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Entrez le titre"
            />
          </div>

          {/* Contenu */}
          <div className="relative">
            <label
              htmlFor="content"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Contenu
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Rédigez votre contenu ici..."
              rows={5}
            />
          </div>

          {/* Catégorie */}
          <div className="relative">
            <label
              htmlFor="category"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="Film">Film</option>
              <option value="Série">Série</option>
              <option value="Critique">Critique</option>
              <option value="Recommandation">Recommandation</option>
            </select>
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-transform duration-200 hover:scale-105 font-semibold"
          >
            Publier 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
