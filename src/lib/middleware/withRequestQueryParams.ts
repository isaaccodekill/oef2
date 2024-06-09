import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const withRequestQueryParams = (schema: z.ZodObject<any>) => (req: NextRequest, context: any, next: any) => {
    try {
        const { searchParams } = new URL(req.url);
        const queryParams: Record<string, any> = Object.fromEntries(searchParams.entries());
        for (const key in queryParams) {
            const value = queryParams[key];
            if (/^\d+$/.test(value)) {
                // Convert to number if it's a string of digits
                queryParams[key] = parseInt(value, 10);
            }
        }
        schema.parse(queryParams);
        context = {
            ...context,
            query: queryParams,
        };

        return next(req, context);
    } catch (error) {
        console.error('Error parsing request query params:', error);
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse('Bad Request', { status: 400 });
    }
};