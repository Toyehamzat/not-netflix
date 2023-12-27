import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const movie = await prisma.movie.findMany();
    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
