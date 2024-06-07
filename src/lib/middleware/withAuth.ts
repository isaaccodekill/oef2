import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../utils/auth";

export default async function withAuth(request: NextResponse, context: any, next: any) {
    const user = await getAuthenticatedUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    return next();
}