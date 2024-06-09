import { prisma } from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { addressService } from "./service.address";

export class UserService<T extends typeof prisma> {

    db: T;
    constructor({ db }: { db: T }) {
        this.db = db;
    }

    async createUser(user: User, street: string): Promise<User> {

        // check if email is in use

        const existingUser = await this.getUserByEmail(user.email);

        if (existingUser) {
            throw new Error('Email is already in use');
        }


        const usercreated = await prisma.user.create({ data: user });

        await addressService.createAddress({ street, userId: usercreated.id });

        return usercreated;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async getUserById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async getUserByAuthIWithId(id: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: { id }, include: {
                addresses: {
                    select: {
                        id: true,
                        street: true
                    }
                }
            }
        });
    }

}

export const userService = new UserService({ db: prisma }) as UserService<typeof prisma>;