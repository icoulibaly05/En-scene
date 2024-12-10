import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Récupère les données en JSON
    const { title, content, category, authorId } = body;

    // Vérification des champs requis
    if (!title || !content || !category || !authorId) {
      return NextResponse.json(
        { error: "Titre, contenu, catégorie et authorId sont requis." },
        { status: 400 }
      );
    }

    // Ajoute un nouveau post dans la base de données
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        views: 0,
        authorId, // Utilise l'authorId fourni dans la requête
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
