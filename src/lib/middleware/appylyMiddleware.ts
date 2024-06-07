// middleware/applyMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';


export type Middleware = (request: NextRequest, context: any, next?: (request: NextRequest, context: any) => Promise<NextResponse>) => Promise<NextResponse>;

// applyMiddleware function
const applyMiddleware = (middleware: Middleware[], handler: (request: NextRequest, context: any) => Promise<NextResponse>) => {
    return middleware.reduceRight((nextHandler, currentMiddleware) => {
        return (request: NextRequest, context) =>
            currentMiddleware(request, context, (req: NextRequest, context: any) => nextHandler(req, context));
    }, handler);
};

export default applyMiddleware;