/* ============================
   AniList GraphQL Types
   ============================ */

export interface MediaTitle {
    romaji: string | null;
    english: string | null;
    native: string | null;
}

export interface MediaCoverImage {
    extraLarge: string | null;
    large: string | null;
    medium: string | null;
    color: string | null;
}

export interface StudioNode {
    name: string;
}

export interface CharacterName {
    full: string | null;
}

export interface CharacterImage {
    large: string | null;
    medium: string | null;
}

export interface CharacterNode {
    name: CharacterName;
    image: CharacterImage;
}

export interface CharacterEdge {
    node: CharacterNode;
    role: "MAIN" | "SUPPORTING" | "BACKGROUND";
}

export interface RelationNode {
    id: number;
    title: MediaTitle;
    coverImage: MediaCoverImage;
    type: string;
    format: string;
}

export interface RelationEdge {
    node: RelationNode;
    relationType: string;
}

export interface RecommendationNode {
    mediaRecommendation: {
        id: number;
        title: MediaTitle;
        coverImage: MediaCoverImage;
    };
}

export interface ScoreDistribution {
    score: number;
    amount: number;
}

export interface MediaTag {
    name: string;
    rank: number;
}

export interface AniListMedia {
    id: number;
    title: MediaTitle;
    coverImage: MediaCoverImage;
    bannerImage: string | null;
    description: string | null;
    averageScore: number | null;
    meanScore: number | null;
    popularity: number | null;
    favourites: number | null;
    episodes: number | null;
    duration: number | null;
    format: string | null;
    status: string | null;
    season: string | null;
    seasonYear: number | null;
    genres: string[];
    tags?: MediaTag[];
    studios?: {
        nodes: StudioNode[];
    };
    characters?: {
        edges: CharacterEdge[];
    };
    relations?: {
        edges: RelationEdge[];
    };
    recommendations?: {
        nodes: RecommendationNode[];
    };
    stats?: {
        scoreDistribution: ScoreDistribution[];
    };
    nextAiringEpisode?: {
        episode: number;
        timeUntilAiring: number;
    } | null;
}

export interface PageInfo {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: number;
}

/* ============================
   App-Specific Types
   ============================ */

export type MediaSort =
    | "TRENDING_DESC"
    | "POPULARITY_DESC"
    | "SCORE_DESC"
    | "FAVOURITES_DESC"
    | "START_DATE_DESC"
    | "UPDATED_AT_DESC";

export type MediaStatus =
    | "RELEASING"
    | "FINISHED"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";

export type MediaFormat =
    | "TV"
    | "TV_SHORT"
    | "MOVIE"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC";

export type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export interface SearchFilters {
    search?: string;
    genres?: string[];
    year?: number;
    season?: MediaSeason;
    format?: MediaFormat;
    status?: MediaStatus;
    sort?: MediaSort;
    page?: number;
    perPage?: number;
}
