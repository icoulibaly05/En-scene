import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://souleymane4:azerty@physique.v64i6.mongodb.net/blog?retryWrites=true&w=majority";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const articleId = url.searchParams.get("articleId");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("blog");
    const comments = await db
      .collection("Comment") // Récupération depuis la collection Comment
      .find({ articleId }) // Filtrage par articleId
      .toArray();

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commentaires" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
