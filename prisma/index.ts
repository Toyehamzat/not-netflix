import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
declare global {
  namespace NodeJS {
    interface global {
      prisma: PrismaClient;
    }
  }
}

if (process.env.NODE_ENV !== "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prismadb) {
    global.prismadb = new PrismaClient();
  }
  prisma = global.prismadb;
}

export default prisma;
