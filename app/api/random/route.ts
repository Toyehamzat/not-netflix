import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const moviesCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
