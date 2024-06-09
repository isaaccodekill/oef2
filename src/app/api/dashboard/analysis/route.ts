import applyMiddleware from "@/lib/middleware/appylyMiddleware";
import withAuth from "@/lib/middleware/withAuth";
import { withRequestQueryParams } from "@/lib/middleware/withRequestQueryParams";
import { getAuthenticatedUser } from "@/lib/utils/auth";
import { dashboardService } from "@/services/service.dashboard";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    noYears: z.number()
})

export const GET = applyMiddleware([
    withRequestQueryParams(schema),
    withAuth
], async function (req: NextRequest, { params, body, query }) {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const dashboardData = await dashboardService.getTreesPlantedPerYear(query.noYears);
    return NextResponse.json(dashboardData, { status: 200 });
}
)