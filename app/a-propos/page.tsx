import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import React from "react";

export default function APropos() {
  return (
    <>
      {/* Appel du Header */}
      <Header />

      {/* Contenu principal */}
      <main className="bg-gradient-to-b from-blue-900 via-purple-900 to-blue-800 text-gray-200 min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-8">
            🌟 Bienvenue sur <span className="text-blue-300">En Scène</span> !
          </h1>
          <p className="text-lg leading-8 text-gray-300 mb-8 text-center">
            Plongez dans l'univers magique des <span className="text-purple-300 font-semibold">films</span> 🎥 et des{" "}
            <span className="text-purple-300 font-semibold">séries</span> 📺. Notre mission ? Vous faire découvrir des pépites, 
            partager des analyses passionnantes et célébrer l'art de la narration visuelle.
          </p>

          <section>
            <h2 className="text-4xl font-semibold text-blue-300 mt-12 mb-6 text-center">
              🎯 Notre Mission
            </h2>
            <p className="text-lg leading-8 text-gray-300 mb-6 text-center">
              Chez <span className="text-purple-300 font-bold">En Scène</span>, nous mettons en lumière chaque chef-d'œuvre, 
              qu'il s'agisse de thrillers captivants, de drames poignants ou de comédies qui vous feront éclater de rire. 
              Chaque écran est une porte ouverte sur un nouvel univers.
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-semibold text-blue-300 mt-12 mb-6 text-center">
              🌟 Ce Que Nous Proposons
            </h2>
            <ul className="list-none text-gray-300 space-y-4">
              <li className="flex items-center space-x-3">
                <span>✅</span>
                <span>Des critiques détaillées des derniers films et séries.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span>✅</span>
                <span>Des analyses captivantes sur des classiques inoubliables.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span>✅</span>
                <span>Des recommandations pour découvrir des trésors cachés.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span>✅</span>
                <span>Des anecdotes et des coulisses fascinantes du monde du cinéma.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl font-semibold text-blue-300 mt-12 mb-6 text-center">
              🙌 Pourquoi Nous Lire ?
            </h2>
            <p className="text-lg leading-8 text-gray-300 text-center">
              <span className="text-purple-300 font-bold">En Scène</span> n'est pas qu'un blog, c'est une communauté de passionnés. 
              Partageons nos découvertes, explorons de nouveaux horizons cinématographiques, et 
              construisons ensemble un espace dédié à l'art et à l'imaginaire. 🌍✨
            </p>
          </section>
        </div>
      </main>

      {/* Appel du Footer */}
      <Footer />
    </>
  );
}
