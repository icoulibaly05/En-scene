import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { prisma } from "./db/prisma"; // Conserve le chemin actuel pour la base de données

export default async function Home() {
  // Récupération des films/séries depuis la base de données
  const movies = await prisma.movie.findMany();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Découvrez les Films et Séries
        </h1>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher un film ou une série..."
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        {/* Filtres */}
        <div className="mb-8 flex justify-between">
          <select
            className="px-4 py-2 rounded-lg bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300"
          >
            <option value="">Filtrer par...</option>
            <option value="genre">Genre</option>
            <option value="year">Année</option>
            <option value="popularity">Popularité</option>
          </select>
        </div>

        {/* Grille des films/séries */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/150"}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">Genre : {movie.genre}</p>
                <p className="text-sm text-gray-400">Année : {movie.year}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              Aucun film ou série disponible pour le moment.
            </p>
          )}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
