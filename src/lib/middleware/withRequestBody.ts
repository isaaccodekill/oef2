// middleware/withRequestBody.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export default function withRequestBody(schema: z.ZodObject<any>) {
    return async (request: NextRequest, context: any, next: any) => {
        try {
            const body = await request.json();
            schema.parse(body); // Validate the body
            context = {
                ...context,
                body,
            }
            return next(request, context);
        } catch (error) {
            console.error('Error parsing request body:', error);
            if (error instanceof z.ZodError) {
                return new NextResponse(error.message, { status: 400 });
            }
            return new NextResponse('Bad Request', { status: 400 });
        }
    };
}
