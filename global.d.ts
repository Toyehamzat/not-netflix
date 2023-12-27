import { PrismaClient } from "@prisma/client";
import { type } from "os";
declare global {
  namespace globalThis {
    var prisma: PrismaClient;
  }
}
