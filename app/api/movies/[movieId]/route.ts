// watch/[movieId]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma";
import serverAuth from "@/lib/serverAuth";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth();

    const { movieId } = req.query;

    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid or missing movieId");
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Movie not found");
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
