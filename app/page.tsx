"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-blue-800 to-purple-900 text-gray-200">
      {/* Header */}
      <Header />
      
      {/* Contenu principal */}
      <main className="flex-grow container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-purple-300 mb-6">
          🎥 Bienvenue dans cette page dédiée aux amoureux des écrans !
        </h1>
        <p className="text-lg text-gray-300">
          Pour entrer en scène, il ne vous reste plus qu'à vous connecter.
        </p>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
