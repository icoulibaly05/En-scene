import { prisma } from "@/app/db/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({
      message: "Utilisateur créé avec succès.",
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur :", error.message);
      return NextResponse.json(
        { error: "Erreur lors de la création de l'utilisateur.", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Une erreur inconnue s'est produite." },
      { status: 500 }
    );
  }
}
