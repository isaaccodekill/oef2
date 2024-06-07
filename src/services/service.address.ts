import { prisma } from '@/lib/db/prisma';
import { Address } from '@prisma/client';

class AddressService<T extends typeof prisma> {
    db: T;
    constructor({ db }: { db: T }) {
        this.db = db;
    }

    async createAddress({
        street,
        userId,

    }: {
        street: string;
        userId: string;

    }): Promise<Address> {
        return prisma.address.create({
            data: {
                street,
                user: {
                    connect: { id: userId }
                }
            }
        });
    }

    async getAllAddressesForUser(userId: string): Promise<Address[]> {
        return prisma.address.findMany({ where: { userId } });
    }
}

export const addressService = new AddressService({ db: prisma }) as AddressService<typeof prisma>;