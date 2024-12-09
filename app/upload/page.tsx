"use client";

import React from "react";
import { useState } from "react";
import { uploadAvatar } from "./uploadActions";

export default function AvatarUploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      setIsUploading(true);

      const result = await uploadAvatar(formData);
      if (result.success && result.url) {
        setImageUrl(result.url);
        setError(null);
      } else {
        setError(result.error || "Erreur lors du téléchargement");
      }
    } catch {
      setError("Une erreur inattendue s'est produite");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
      <div
        className="max-w-md w-full bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-3xl shadow-xl"
        role="main"
        aria-label="Formulaire de téléchargement d'avatar"
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-6">
          📷 Téléchargez Votre Image
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-6">
            {imageUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg">
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <label
              htmlFor="file"
              className="block w-full text-center text-sm text-purple-300 font-medium"
            >
              Sélectionnez une image
            </label>
            <input
              name="file"
              type="file"
              accept="image/*"
              required
              disabled={isUploading}
              className="block w-full text-sm text-gray-300 bg-gray-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />

            <button
              type="submit"
              disabled={isUploading}
              aria-busy={isUploading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
            >
              {isUploading ? "Téléchargement..." : "Télécharger 📤"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
