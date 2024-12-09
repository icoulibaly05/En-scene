import { prisma } from "@/app/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        include: {
          posts: {
            include: { comments: true },
          },
          comments: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: "Erreur lors de la récupération des données",
          details: error.message,
        });
      }
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
