import { prisma } from "@/lib/db/prisma";
import { Console } from "console";



class DashboardService<T extends typeof prisma> {
    db: T;
    constructor({ db }: { db: T }) {
        this.db = db;
    }

    async getDashboardData(userId: string): Promise<{
        totalTrees: number;
        userTrees: number;
        commonSpecies: {
            species: string;
            count: number;
        }[];
        averageHeight: number;

    }> {
        // get all the count of all the trees in the system
        const totalTrees = await prisma.tree.count();

        // get all the count of all the trees for the user
        const userTrees = await prisma.tree.count({ where: { userId } });

        // get the most common species of tree
        const mostCommonSpecies = await prisma.tree.groupBy({
            by: ['species'],
            _count: {
                species: true
            },
            orderBy: {
                _count: {
                    species: 'desc'
                }
            },
            take: 5
        });

        // get the average height of all trees in the system
        const averageHeight = await prisma.tree.aggregate({
            _avg: {
                height: true
            }
        });

        return {
            totalTrees,
            userTrees,
            commonSpecies: mostCommonSpecies.map((species) => ({
                species: species.species,
                count: species._count.species
            })),
            averageHeight: averageHeight._avg.height || 0 as number
        }
    }

    // draw a graph of the total number of trees planted per year over the last 10 years
    async getTreesPlantedPerYear(noOfYears: number): Promise<{ year: string, trees_planted: number }[]> {
        const currentYear = new Date().getFullYear();
        const response = await prisma.$queryRaw`
        SELECT
        EXTRACT(YEAR FROM "yearPlanted") as year, COUNT(*) as trees_planted
        FROM "Tree"
        WHERE EXTRACT(YEAR FROM "yearPlanted") >= ${currentYear - noOfYears}
        GROUP BY EXTRACT(YEAR FROM "yearPlanted")
        ORDER BY year;
        ` as { year: string, trees_planted: number }[]

        const formattedResults = response.map((result) => ({
            ...result,
            trees_planted: Number(result.trees_planted)
        }))

        return formattedResults;
    }
}




export const dashboardService = new DashboardService({ db: prisma }) as DashboardService<typeof prisma>;