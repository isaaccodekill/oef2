// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/service.user';
import applyMiddleware from '@/lib/middleware/appylyMiddleware';
import withAuth from '@/lib/middleware/withAuth';
import z from 'zod';
import withRequestBody from '@/lib/middleware/withRequestBody';
import { getAuthenticatedUser } from '@/lib/utils/auth';



export const GET = applyMiddleware(
    [withAuth],
    async (req: NextRequest, { params }) => {
        try {
            const user = await getAuthenticatedUser()
            return NextResponse.json(user, { status: 200 });
        } catch (error) {
            console.error("Error fetching users:", error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
)


const schema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    street: z.string(),
});


export const POST = applyMiddleware(
    [
        withRequestBody(schema),
    ],
    async (req: NextRequest, { body }: { body: z.infer<typeof schema> }) => {
        try {

            const user = await userService.createUser({
                id: body.id,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
            }, body.street);
            return NextResponse.json(user, { status: 201 });
        } catch (error) {
            console.error("Error creating user:", error);
            return NextResponse.json({ message: "Bad Request" }, { status: 500 });
        }
    }
)
