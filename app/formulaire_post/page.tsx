"use client";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormulairePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("published", String(formData.published));
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Post créé avec succès !");
        setFormData({ title: "", content: "", published: false });
        setImage(null);
        setPreview(null);
      } else {
        toast.error(result.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      toast.error("Erreur lors de l'envoi des données.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <ToastContainer />
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-3xl shadow-lg w-[90%] sm:w-[30rem] md:w-[35rem] lg:w-[40rem]">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-400">
          🎥 Créez Votre Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-purple-300 mb-2"
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
              placeholder="Entrez un titre captivant"
            />
          </div>

          {/* Contenu */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-purple-300 mb-2"
            >
              Contenu
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 h-28"
              placeholder="Écrivez le contenu de votre post"
            ></textarea>
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-purple-300 mb-2"
            >
              Image du Post
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-800 text-gray-400 rounded-lg focus:outline-none"
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Aperçu :</p>
                <img
                  src={preview}
                  alt="Prévisualisation"
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Publier */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label
              htmlFor="published"
              className="text-sm font-semibold text-purple-300"
            >
              Publier immédiatement
            </label>
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-transform duration-200 hover:scale-105 font-semibold"
          >
            Publier 🎬
          </button>
        </form>
      </div>
    </div>
  );
}
