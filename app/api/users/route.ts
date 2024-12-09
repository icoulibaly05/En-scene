import { prisma } from "@/app/db/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Methode POST pour créer un utilisateur et un post avec un commentaire
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      role,
      postTitle,
      postContent,
      postSlug,
      commentContent,
    } = body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà." },
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // Le facteur de salage 10 est généralement recommandé

    // Créer un utilisateur avec un post
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Enregistrer le mot de passe haché
        role,
        posts: {
          create: {
            title: postTitle,
            content: postContent,
            slug: postSlug,
          },
        },
      },
      include: { posts: true }, // Inclure les posts créés dans la réponse
    });

    // Vérifier si le post a été créé
    if (!user.posts.length) {
      throw new Error("Erreur lors de la création du post.");
    }

    // Récupérer l'ID du Post
    const postId = user.posts[0].id;

    // Créer un commentaire lié au post
    const comment = await prisma.comment.create({
      data: {
        content: commentContent,
        authorId: user.id,
        postId: postId,
      },
    });

    // Réponse de succès
    return NextResponse.json({
      message: "Données insérées avec succès",
      user,
      comment,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur Prisma :", error.message);
      return NextResponse.json(
        {
          error: "Erreur lors de l'insertion des données",
          details: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Une erreur inconnue s'est produite" },
      { status: 500 }
    );
  }
}

// Methode GET pour récupérer les utilisateurs
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Erreur lors de la récupération des données",
          details: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Une erreur inconnue s'est produite" },
      { status: 500 }
    );
  }
}
