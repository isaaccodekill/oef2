import qs from 'qs'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const withRequestQueryParams = (schema: z.ZodObject<any>) => (req: NextRequest, context: any, next: any) => {
    try {

        const search = req.nextUrl.search.slice(1);
        const queryParams = qs.parse(search);
        const newQueryParams:Record<string, any> = {...queryParams};
    
        for (const key in queryParams) {
            const value = queryParams[key] as string;
            if (/^\d+$/.test(value)) {
                // Convert to number if it's a string of digits
                newQueryParams[key] = parseInt(value, 10);
            }
        }
        schema.parse(newQueryParams);
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