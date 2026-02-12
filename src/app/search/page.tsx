import { SearchInterface } from "@/components/search/SearchInterface";
import { searchAnime } from "@/lib/anilist/api";
import type { SearchFilters } from "@/types/anilist";

export const metadata = {
    title: "Search Anime - AniChest",
    description: "Search and filter through thousands of anime on AniChest.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: {
    searchParams: SearchParams;
}) {
    const searchParams = await props.searchParams;

    const filters: SearchFilters = {
        search: typeof searchParams.search === "string" ? searchParams.search : undefined,
        genres: typeof searchParams.genres === "string"
            ? [searchParams.genres]
            : Array.isArray(searchParams.genres)
                ? searchParams.genres
                : undefined,
        year: searchParams.year ? parseInt(searchParams.year as string) : undefined,
        season: searchParams.season as any,
        format: searchParams.format as any,
        status: searchParams.status as any,
        sort: searchParams.sort as any,
    };

    const initialData = await searchAnime(filters);

    return <SearchInterface initialData={initialData} filters={filters} />;
}
