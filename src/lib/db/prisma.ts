import { PrismaClient, Prisma } from '@prisma/client';
import { queryLogger } from './extension';

class PrismaSingleton {
    private static instance: PrismaSingleton;
    private prisma: PrismaClient;

    private constructor() {
        const prismaOptions = {
            log: ['query', 'info', 'warn'] as Prisma.LogLevel[],
        };

        const client = new PrismaClient(prismaOptions);

        this.prisma = client.$extends(queryLogger) as PrismaClient;
    }

    public static getInstance(): PrismaSingleton {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaSingleton();
        }
        return PrismaSingleton.instance;
    }

    public getPrisma(): PrismaClient {
        return this.prisma;
    }
}

export const prisma = PrismaSingleton.getInstance().getPrisma();