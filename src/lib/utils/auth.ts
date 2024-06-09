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
    const { error, data } = await db.auth.getSession();
    if (error) {
        console.error(error)
        throw new Error('Session error')
    }
    const email = data?.session?.user?.email as string;

    if (!email) {
        return null;
    }

    const userData = await userService.getUserByEmail(email) as UserContext;
    return userData;
}