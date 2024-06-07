import { prisma } from "@/lib/db/prisma";
import { Tree } from '@prisma/client';


class TreeService<T extends typeof prisma> {

    db: T;
    constructor({ db }: { db: T }) {
        this.db = db;
    }

    async createTree({
        userId,
        addressId,
        name,
        species,
        height,
        trunkCircumference,
        yearPlanted,
    }: {
        userId: string;
        addressId: string;
        name: string;
        species: string;
        height: number;
        trunkCircumference: number;
        yearPlanted: string;
    }): Promise<Tree> {
        return prisma.tree.create({
            data: {
                name,
                species,
                height,
                trunkCircumference,
                yearPlanted: new Date(yearPlanted),
                address: {
                    connect: { id: addressId }
                },
                user: {
                    connect: { id: userId }
                }
            }
        });
    }

    // get all trees for a user
    async getAllTreesForUser(userId: string): Promise<Tree[]> {
        return prisma.tree.findMany({ where: { userId } });
    }

    // update a tree
    async updateTree({
        id,
        name,
        species,
        height,
        trunkCircumference,
        yearPlanted,
    }: {
        id: string;
        name: string;
        species: string;
        height: number;
        trunkCircumference: number;
        yearPlanted: string;
    }): Promise<Tree> {
        return prisma.tree.update({
            where: { id },
            data: {
                name,
                species,
                height,
                trunkCircumference,
                yearPlanted: new Date(yearPlanted),
            }
        });
    }

    // delete a tree
    async deleteTree(id: string): Promise<Tree> {
        return prisma.tree.delete({ where: { id } });
    }


}

export const treeService = new TreeService({ db: prisma }) as TreeService<typeof prisma>;