// PostFavorite API
import { NextApiRequest } from "next";
import prisma from "@/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  try {
    const { currentUser } = await serverAuth();
    const { movieId } = req.body;

    console.log("Request Body:", req.body);
    console.log("Movie ID received:", movieId);

    if (!movieId) {
      throw new Error("Invalid movieId");
    }

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid movieId");
    }

    const user = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error handling favorite:", error);
    return NextResponse.json({ error: "Invalid movieId" }, { status: 400 });
  }
};
