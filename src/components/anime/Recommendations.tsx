"use client";

import { AniListMedia } from "@/types/anilist";
import Link from "next/link";
import { AnimeCard } from "./AnimeCard"; // We can reuse AnimeCard if data shape matches... 
// But generic RecommendationNode doesn't match full Media fields.
// RecommendationNode has `mediaRecommendation: { id, title, coverImage }`.
// A simplified card is better.

export function Recommendations({ recommendations }: { recommendations?: AniListMedia["recommendations"] }) {
    if (!recommendations?.nodes?.length) return null;

    return (
        <section>
            <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-[var(--color-primary)] pl-3">
                Recommended
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recommendations.nodes.map((rec, i) => {
                    if (!rec.mediaRecommendation) return null;
                    const media = rec.mediaRecommendation;
                    return (
                        <Link
                            key={i}
                            href={`/anime/${media.id}`}
                            className="block group relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1a1a2e]"
                        >
                            <img
                                src={media.coverImage.large || media.coverImage.medium || ""}
                                alt={media.title.english || media.title.romaji || "Anime"}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                <h4 className="text-sm font-medium text-white line-clamp-2">
                                    {media.title.english || media.title.romaji}
                                </h4>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
