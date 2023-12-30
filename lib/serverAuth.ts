import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@/prisma";
import { NextAuthOption } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async () => {
  try {
    const session = await getServerSession(NextAuthOption);

    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return { currentUser };
  } catch (error) {
    // Redirect to /auth when there is an error (session not found or user not signed in)
    throw new Error("/auth");
  }
};

export default serverAuth;
