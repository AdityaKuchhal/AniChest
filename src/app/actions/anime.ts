"use server";

import { searchAnime } from "@/lib/anilist/api";
import type { SearchFilters } from "@/types/anilist";

export async function fetchAnimePage(page: number, filters: SearchFilters) {
    try {
        const data = await searchAnime({ ...filters, page });
        return data;
    } catch (error) {
        console.error("Error fetching anime page:", error);
        throw new Error("Failed to fetch anime");
    }
}
