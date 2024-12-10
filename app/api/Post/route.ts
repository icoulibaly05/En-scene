import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, category, authorId } = body;

    if (!title || !content || !category || !authorId) {
      return NextResponse.json(
        { error: "Titre, contenu, catégorie et authorId sont requis." },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        views: 0,
        authorId,
      },
    });

    return NextResponse.json({ message: "Post créé avec succès", post });
  } catch (error) {
    console.error("Erreur API :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du post." },
      { status: 500 }
    );
  }
}
