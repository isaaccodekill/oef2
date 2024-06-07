import { prisma } from "@/lib/db/prisma";



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
            take: 1
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
            averageHeight: averageHeight._avg.height as number
        }
    }

    // draw a graph of the total number of trees planted per year over the last 10 years
    async getTreesPlantedPerYear({ noOfYears }: { noOfYears: number }): Promise<{ year: string, trees_planted: number }> {
        const currentYear = new Date().getFullYear();
        const response = await prisma.$queryRaw`
        SELECT
        EXTRACT(YEAR FROM year_planted) as year,
        COUNT(*) as trees_planted
        FROM tree
        WHERE EXTRACT(YEAR FROM year_planted) >= ${currentYear - noOfYears}
        GROUP BY EXTRACT(YEAR FROM year_planted)
        ORDER BY year;
        `
        return response as { year: string, trees_planted: number };
    }
}




export const dashboardService = new DashboardService({ db: prisma }) as DashboardService<typeof prisma>;