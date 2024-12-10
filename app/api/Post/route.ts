import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Connexion à MongoDB
const uri = "mongodb+srv://souleymane4:azerty@physique.v64i6.mongodb.net/blog?retryWrites=true&w=majority";

export async function GET(request: Request) {
  const client = new MongoClient(uri); // Initialisation du client MongoDB
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Récupération du paramètre 'id' de l'URL

  try {
    // Connexion à la base de données
    await client.connect();
    const db = client.db("blog"); // Accès à la base de données "blog"

    if (id) {
      // Si un ID est fourni, récupération d'un seul post
      const post = await db.collection("Post").findOne({ _id: new ObjectId(id) });

      if (!post) {
        return NextResponse.json(
          { error: "Post non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json({ post });
    } else {
      // Si aucun ID n'est fourni, récupération de tous les posts
      const posts = await db.collection("Post").find({}).toArray();
      return NextResponse.json({ posts });
    }
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
