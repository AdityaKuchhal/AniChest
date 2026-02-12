import { anilistClient } from "./client";
import {
    TRENDING_QUERY,
    TOP_AIRING_QUERY,
    MOST_POPULAR_QUERY,
    MOST_FAVORITE_QUERY,
    LATEST_QUERY,
    SEARCH_QUERY,
    ANIME_DETAIL_QUERY,
    RANDOM_ANIME_QUERY,
} from "./queries";
import type { AniListMedia, PageInfo, SearchFilters } from "@/types/anilist";

interface PageResponse {
    Page: {
        pageInfo: PageInfo;
        media: AniListMedia[];
    };
}

interface DetailResponse {
    Media: AniListMedia;
}

export async function getTrending(perPage: number = 20): Promise<AniListMedia[]> {
    const data = await anilistClient.request<PageResponse>(TRENDING_QUERY, {
        page: 1,
        perPage,
    });
    return data.Page.media;
}

export async function getTopAiring(perPage: number = 10): Promise<AniListMedia[]> {
    const data = await anilistClient.request<PageResponse>(TOP_AIRING_QUERY, {
        page: 1,
        perPage,
    });
    return data.Page.media;
}

export async function getMostPopular(perPage: number = 10): Promise<AniListMedia[]> {
    const data = await anilistClient.request<PageResponse>(MOST_POPULAR_QUERY, {
        page: 1,
        perPage,
    });
    return data.Page.media;
}

export async function getMostFavorite(perPage: number = 10): Promise<AniListMedia[]> {
    const data = await anilistClient.request<PageResponse>(MOST_FAVORITE_QUERY, {
        page: 1,
        perPage,
    });
    return data.Page.media;
}

export async function getLatest(perPage: number = 10): Promise<AniListMedia[]> {
    const data = await anilistClient.request<PageResponse>(LATEST_QUERY, {
        page: 1,
        perPage,
    });
    return data.Page.media;
}

export async function searchAnime(
    filters: SearchFilters
): Promise<{ media: AniListMedia[]; pageInfo: PageInfo }> {
    const variables: Record<string, unknown> = {
        page: filters.page || 1,
        perPage: filters.perPage || 20,
    };

    if (filters.search) variables.search = filters.search;
    if (filters.genres && filters.genres.length > 0) variables.genre_in = filters.genres;
    if (filters.year) variables.seasonYear = filters.year;
    if (filters.season) variables.season = filters.season;
    if (filters.format) variables.format = filters.format;
    if (filters.status) variables.status = filters.status;
    if (filters.sort) variables.sort = [filters.sort];

    const data = await anilistClient.request<PageResponse>(SEARCH_QUERY, variables);
    return {
        media: data.Page.media,
        pageInfo: data.Page.pageInfo,
    };
}

export async function getAnimeDetail(id: number): Promise<AniListMedia> {
    const data = await anilistClient.request<DetailResponse>(ANIME_DETAIL_QUERY, { id });
    return data.Media;
}

export async function getRandomAnime(): Promise<AniListMedia> {
    // First, get total count by fetching page 1
    const randomPage = Math.floor(Math.random() * 200) + 1;
    const data = await anilistClient.request<PageResponse>(RANDOM_ANIME_QUERY, {
        page: randomPage,
    });
    return data.Page.media[0];
}
