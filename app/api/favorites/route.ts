import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    // const data = useSession()

    const favoritedMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoritedMovies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};
