// lib/prisma.ts
const { PrismaClient } = require('../node_modules/.prisma/client');

let prisma: typeof PrismaClient;
declare global {
  let prisma: typeof PrismaClient | undefined;
}
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}
export default prisma;
