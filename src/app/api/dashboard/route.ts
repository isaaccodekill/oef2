import applyMiddleware from "@/lib/middleware/appylyMiddleware";
import withAuth from "@/lib/middleware/withAuth";
import { getAuthenticatedUser } from "@/lib/utils/auth";
import { dashboardService } from "@/services/service.dashboard";
import { NextRequest, NextResponse } from "next/server";

export const GET = applyMiddleware([
    withAuth
], async function (req: NextRequest, { params, body }) {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const dashboardData = await dashboardService.getDashboardData(user.id);
    return NextResponse.json(dashboardData, { status: 200 });
}
)
