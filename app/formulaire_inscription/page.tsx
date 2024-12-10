"use client";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Formulaire() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Utilisateur créé avec succès !");
        setTimeout(() => {
          window.location.href = "http://localhost:3000"; // Redirection
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
          📝 Inscription Utilisateur
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div className="relative">
            <label
              htmlFor="name"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Entrez votre nom"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="votre@email.com"
            />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <label
              htmlFor="password"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
          </div>

          {/* Rôle */}
          <div className="relative">
            <label
              htmlFor="role"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Rôle
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-transform duration-200 hover:scale-105 font-semibold"
          >
            S'inscrire 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
