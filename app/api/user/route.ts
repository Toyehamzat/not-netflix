import { connectToDatabase } from "@/helper/server-helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const user = await prisma.user.findMany();
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
