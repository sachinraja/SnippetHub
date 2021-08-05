import { PrismaClient } from "@prisma/client";
import envConfig from "src/config";

declare const global: typeof globalThis & { prisma?: PrismaClient };

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (envConfig.get("env") === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
