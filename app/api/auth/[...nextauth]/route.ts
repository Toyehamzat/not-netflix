import { connectToDatabase } from "@/helper/server-helpers";
import prisma from "@/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export const NextAuthOption: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          await connectToDatabase();
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });
          if (!user || !user.hashedPassword) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (isPasswordCorrect) {
            return user;
          }
          return null;
        } catch (err) {
          console.log(err);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
  debug: process.env.NODE_ENV !== "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: "process.env.NEXTAUTH_SECRET",
};

const handler = NextAuth(NextAuthOption);

export { handler as GET, handler as POST };
