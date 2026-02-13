import { getAnimeDetail } from "@/lib/anilist/api";
import { AnimeHero } from "@/components/anime/AnimeHero";
import { AnimeInfo } from "@/components/anime/AnimeInfo";
// import { AnimeTabs } from "@/components/anime/AnimeTabs"; // Pending implementation in client wrapper
import { AnimeDetailClient } from "@/components/anime/AnimeDetailClient"; // Client wrapper for interactivity
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    try {
        const data = await getAnimeDetail(parseInt(id));
        return {
            title: `${data.title.english || data.title.romaji} - AniChest`,
            description: data.description?.replace(/<[^>]*>?/gm, "").slice(0, 160),
            openGraph: {
                images: [data.bannerImage || data.coverImage.extraLarge || ""],
            },
        };
    } catch (error) {
        return { title: "Anime Not Found - AniChest" };
    }
}

export default async function AnimeDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params; // Next.js 15: params is a promise
    let media;

    try {
        media = await getAnimeDetail(parseInt(id));
    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">Anime not found or API error.</h1>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
            <AnimeHero media={media} />

            <div className="container mx-auto px-4 max-w-[1200px] flex flex-col lg:flex-row gap-8">
                {/* Sidebar Info - Desktop: Left (or Right? Usually Left in standard layouts but I can do Right) -> Let's do Left for extensive info, or specific layout. 
           Wait, implementation plan said Sidebar: Quick stats.
           Let's standard layout: Sidebar Left, Content Right? Or Content Left, Sidebar Right?
           AniList has sidebar left. MAL has sidebar left.
           Let's do Sidebar Left (Desktop).
        */}
                <aside className="w-full lg:w-[280px] flex-shrink-0">
                    <AnimeInfo media={media} />
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* We need a Client Component to manage Tabs state */}
                    <AnimeDetailClient media={media} />
                </div>
            </div>
        </div>
    );
}
