import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";

export async function POST(req: Request) {
  try {
    // Récupérer les données envoyées
    const body = await req.json();
    const { title, content, category, authorId } = body;

    // Validation des données
    if (!title || !content || !category || !authorId) {
      return NextResponse.json(
        { error: "Titre, contenu, catégorie et authorId sont requis." },
        { status: 400 }
      );
    }

    // Créer un post dans la base de données
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        views: 0, // Par défaut, les vues sont à 0
        authorId, // Relie le post à un utilisateur
      },
    });

    return NextResponse.json({ message: "Post créé avec succès", post });
  } catch (error: any) {
    console.error("Erreur lors de la création du post :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du post." },
      { status: 500 }
    );
  }
}
