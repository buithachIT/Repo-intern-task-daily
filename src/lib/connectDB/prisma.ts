
import { PrismaClient } from '@/generated/prisma';
declare global {
    // cho phép caching trên env development
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
    global.prisma = prisma;
}

export default prisma;
