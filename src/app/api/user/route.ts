// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/service.user';
import applyMiddleware from '@/lib/middleware/appylyMiddleware';
import withAuth from '@/lib/middleware/withAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';
import withRequestBody from '@/lib/middleware/withRequestBody';


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
            console.log("User created: here api", user);
            return NextResponse.json(user, { status: 201 });
        } catch (error) {
            console.error("Error creating user:", error);
            return NextResponse.json({ message: "Bad Request" }, { status: 500 });
        }
    }
)
