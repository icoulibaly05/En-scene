"use client";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companySize: "",
    country: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre message a été envoyé !");
    // Ici, vous pouvez ajouter la logique pour envoyer les données.
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 via-purple-900 to-blue-800">
      <ToastContainer />
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-3xl shadow-lg w-[90%] sm:w-[30rem] md:w-[35rem] lg:w-[40rem]">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-400">
          📞 Contactez-nous
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Prénom */}
          <div className="relative">
            <label
              htmlFor="firstName"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Entrez votre prénom"
            />
          </div>

          {/* Nom */}
          <div className="relative">
            <label
              htmlFor="lastName"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
              placeholder="exemple@supdevinci-edu.fr"
            />
          </div>

          {/* Téléphone */}
          <div className="relative">
            <label
              htmlFor="phone"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          {/* Pays */}
          <div className="relative">
            <label
              htmlFor="country"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Pays
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Sélectionnez un pays</option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          {/* Message */}
          <div className="relative">
            <label
              htmlFor="message"
              className="absolute -top-2 left-4 bg-gray-800 px-2 text-sm text-purple-300"
            >
              Votre message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Entrez votre message ici..."
            ></textarea>
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-transform duration-200 hover:scale-105 font-semibold"
          >
            Envoyer 📧
          </button>
        </form>
      </div>
    </div>
  );
}
