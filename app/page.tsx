'use client';
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { prisma } from "./db/prisma";
import { useState } from "react";

export default async function Home() {
  // Récupération initiale des films
  let initialMovies = [];
  try {
    initialMovies = await prisma.movie.findMany({
      include: {
        comments: true,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des films/séries :", error);
  }

  // État pour gérer la recherche côté client
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);

  // Gestion de la recherche
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setMovies(initialMovies); // Rétablir les films initiaux si la barre est vide
      setShowNoResults(false);
    } else {
      const filteredMovies = initialMovies.filter((movie) =>
        movie.title.toLowerCase().includes(term.toLowerCase())
      );
      setMovies(filteredMovies);
      setShowNoResults(filteredMovies.length === 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-blue-800 to-purple-900 text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-purple-300 text-center mb-6">
          🎥 Bienvenue sur En Scène - Partagez vos avis sur les Films et Séries
        </h1>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Rechercher un film ou une série..."
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Section Films/Séries */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/150"}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-400">
                  🎭 Genre : {movie.genre.join(", ")}
                </p>
                <p className="text-sm text-gray-400">📅 Année : {movie.year}</p>
                <p className="text-sm text-gray-400 mb-4">
                  👀 Vues : {movie.views}
                </p>
                {/* Avis des utilisateurs */}
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-purple-400">
                    📝 Avis des utilisateurs :
                  </h4>
                  {movie.comments.length > 0 ? (
                    <ul className="text-sm text-gray-300 mt-2 space-y-2">
                      {movie.comments.slice(0, 2).map((comment) => (
                        <li key={comment.id} className="border-t pt-2">
                          {comment.content} -{" "}
                          <span className="italic text-gray-400">
                            {comment.author.name}
                          </span>
                        </li>
                      ))}
                      {movie.comments.length > 2 && (
                        <li className="text-gray-400 italic">
                          ...et plus d'avis disponibles.
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      Aucun avis disponible pour ce film.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          showNoResults && (
            <p className="text-center text-gray-300">
              😢 Aucun avis n'a été émis sur le film ou la série que vous recherchez.
            </p>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
