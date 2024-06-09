import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "../utils/auth";

export default async function withAuth(request: NextRequest, context: any, next: any) {
    const user = await getAuthenticatedUser();
    console.log("Shake yansh again 3", user);
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    return next(request, context);
}