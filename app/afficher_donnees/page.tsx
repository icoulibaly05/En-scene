"use client";

import { useEffect, useState } from "react";

// Définir l'interface pour la structure de vos données
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  posts: Post[];
}

// Ajout de l'interface pour la structure complète des données
interface Post {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
}

interface UserData {
  users: User[];
}

export default function AfficherDonnees() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          setError(result.error || "Une erreur est survenue.");
        }
      } catch {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des données</h1>
      {data &&
        data.users.map((user: User) => (
          <div key={user.id}>
            <h2>
              {user.name} ({user.email})
            </h2>
            <p>Rôle : {user.role}</p>
            {user.posts.map((post: Post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.comments.map((comment: Comment) => (
                  <p key={comment.id}>Commentaire : {comment.content}</p>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
