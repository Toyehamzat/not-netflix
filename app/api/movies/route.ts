import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
