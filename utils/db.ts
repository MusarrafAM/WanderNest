// In development, the command next dev clears Node.js cache on run. This in turn initializes
// a new PrismaClient instance each time due to hot reloading that creates a connection to the database.
// This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.
// to prevent this we add this below code this is recommend in their doc for NEXT js projects.
// in short => if an existing instance is existing the not gonna create a new instance
//* more info => https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help#solution
//! So with this instead of getting prisma from the package, we get this from this file exported prisma.

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
