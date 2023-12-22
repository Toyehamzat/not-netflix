import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/helper/server-helpers";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "name, email, and password are required" },
        { status: 422 }
      );
    }

    await connectToDatabase();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
