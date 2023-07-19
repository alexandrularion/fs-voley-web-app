// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
declare global {
  let prisma: PrismaClient | undefined;
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
