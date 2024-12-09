"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import C_Footer from "./C_Footer";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        toast.success(`Bonjour, ${data.user.name}!`);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-purple-900">
      <ToastContainer />
      {/* Section gauche : Bienvenue */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-gradient-to-b from-purple-900 to-blue-900 text-white p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-extrabold mb-6">Bienvenue !</h1>
          <p className="text-lg mb-6">
            Connectez-vous à votre espace personnel pour explorer le monde du
            cinéma et des séries avec <span className="font-bold">En Scène</span>.
          </p>
          <img
            src="/images/login_cinema.svg"
            alt="Illustration cinéma"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* Section droite : Formulaire */}
      <main className="flex flex-col justify-center items-center flex-1 p-6 md:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Connexion
          </h2>
          {error && (
            <div className="text-red-600 text-sm text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de Passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Se connecter
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Vous n'avez pas de compte ?{" "}
            <a href="/formulaire_inscription" className="text-blue-500 hover:underline">
              Inscrivez-vous ici
            </a>
          </p>
        </div>
      </main>

      <C_Footer />
    </div>
  );
}
