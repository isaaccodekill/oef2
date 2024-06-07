import { Prisma } from "@prisma/client"
import { createClientServer } from "./supabase/server";
import { userService } from "@/services/service.user";

export type UserContext = Prisma.UserGetPayload<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    include: {
        addresses: {
            select: {
                id: true;
                street: true;
            }
        }

    }
}> | null;

export const getAuthenticatedUser = async (): Promise<UserContext | null> => {
    const db = createClientServer();
    const session = await db.auth.getSession();
    const userId = session.data?.session?.user?.id;



    if (!userId) {
        return null;
    }

    const userData = await userService.getUserByAuthIWithId(userId) as UserContext;
    return userData;
}