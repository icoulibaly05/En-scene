import { prisma } from "@/app/db/prisma";
import { NextResponse } from "next/server";

// methode post et get

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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        posts: {
          create: {
            title: postTitle,
            content: postContent,
            slug: postSlug,
          },
        },
      },
      include: {
        posts: true,
      },
    });

    const postId = user.posts[0].id;
    const comment = await prisma.comment.create({
      data: {
        content: commentContent,
        authorId: user.id,
        postId: postId,
      },
    });

    return NextResponse.json({
      message: "Données insérées avec succès",
      user,
      comment,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      {
        error: "Erreur lors de l'insertion des données",
        details: message,
      },
      { status: 500 }
    );
  }
}

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
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération des données",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
