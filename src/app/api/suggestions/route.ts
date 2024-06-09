import withAuth from "@/lib/middleware/withAuth";
import { withRequestQueryParams } from "@/lib/middleware/withRequestQueryParams";
import applyMiddleware from "@/lib/middleware/appylyMiddleware";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { suggestionService } from "@/services/service.suggestion";

const schema = z.object({
    input: z.string(),
})


export const GET = applyMiddleware([withRequestQueryParams(schema), withAuth],
    async function (req: NextRequest, { query }) {
        try {
            const suggestions = await suggestionService.getSuggestions(query.input);
            return NextResponse.json(suggestions, { status: 200 });
        } catch (error) {
            console.error("Error getting suggestions:", error);
            return NextResponse.json({ message: "Bad Request" }, { status: 500 });
        }
    });