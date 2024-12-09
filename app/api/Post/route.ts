import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";
import { uploadImage } from "@/app/utils/blob"; // Fonction pour gérer l'upload d'image

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const published = formData.get("published") === "true";
    const imageFile = formData.get("image") as Blob | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Titre et contenu requis." }, { status: 400 });
    }

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile); // Fonction personnalisée pour uploader
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        slug: title.toLowerCase().replace(/ /g, "-"),
        views: 0,
        authorId: "author-id-placeholder", // Remplacez avec la logique pour récupérer l'auteur
        ...(imageUrl && { imageUrl }), // Ajout de l'image si uploadée
      },
    });

    return NextResponse.json({ message: "Post créé avec succès", post });
  } catch (error: any) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Erreur lors de la création du post" }, { status: 500 });
  }
}
