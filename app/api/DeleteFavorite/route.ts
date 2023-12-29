import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { without } from "lodash";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { connectToDatabase } from "@/helper/server-helpers";
export const DELETE = async (req: NextApiRequest) => {
  try {
    const { currentUser } = await serverAuth();

    const { movieId } = req.body;

    await connectToDatabase();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
