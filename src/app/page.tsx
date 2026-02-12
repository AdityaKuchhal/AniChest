import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrendingSection } from "@/components/home/TrendingSection";
import { ContentGrid } from "@/components/home/ContentGrid";
import { RandomAnime } from "@/components/home/RandomAnime";
import {
    getTrending,
    getTopAiring,
    getMostPopular,
    getMostFavorite,
} from "@/lib/anilist";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
    // Fetch all data in parallel on the server
    const [trending, topAiring, popular, favorites] = await Promise.all([
        getTrending(10),
        getTopAiring(12),
        getMostPopular(12),
        getMostFavorite(12),
    ]);

    const contentTabs = [
        {
            key: "top-airing",
            label: "Top Airing",
            icon: "📡",
            data: topAiring,
            href: "/search?status=RELEASING&sort=SCORE_DESC",
        },
        {
            key: "most-popular",
            label: "Most Popular",
            icon: "🏆",
            data: popular,
            href: "/search?sort=POPULARITY_DESC",
        },
        {
            key: "most-favorite",
            label: "Most Favorite",
            icon: "❤️",
            data: favorites,
            href: "/search?sort=FAVOURITES_DESC",
        },
    ];

    return (
        <>
            {/* Hero Spotlight Carousel */}
            <HeroCarousel anime={trending} />

            {/* Trending Horizontal Scroll */}
            <TrendingSection anime={trending} title="Trending Now" />

            {/* Tabbed Content Grids */}
            <ContentGrid tabs={contentTabs} />

            {/* Random Anime Discovery */}
            <RandomAnime />
        </>
    );
}
