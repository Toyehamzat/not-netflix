import prisma from "../../../../prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/helper/server-helpers";

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 422 }
      );
    }

    await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { username, email, hashedPassword },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
