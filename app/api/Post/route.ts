import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Connexion à MongoDB
const uri = "mongodb+srv://souleymane4:azerty@physique.v64i6.mongodb.net/blog?retryWrites=true&w=majority";

export async function GET() {
  const client = new MongoClient(uri); // Initialisation du client MongoDB

  try {
    // Connexion à la base de données
    await client.connect();
    const db = client.db("blog"); // Accès à la base de données "blog"
    const posts = await db.collection("Post").find({}).toArray(); // Récupération de tous les documents de la collection "Post"

    // Retour des données au format JSON
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des posts" },
      { status: 500 }
    );
  } finally {
    // Fermeture de la connexion à MongoDB
    await client.close();
  }
}
