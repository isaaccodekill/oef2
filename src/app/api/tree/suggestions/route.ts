import { suggestionService } from "@/services/service.suggestion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { query }: { query: any }) {
    const queryString = query.name as string;

    if (!queryString) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const suggestions = await suggestionService.getSuggestions(queryString);

    return NextResponse.json(suggestions, { status: 200 });
}
