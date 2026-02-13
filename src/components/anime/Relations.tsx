"use client";

import { AniListMedia } from "@/types/anilist";
import Link from "next/link";

export function Relations({ relations }: { relations?: AniListMedia["relations"] }) {
    if (!relations?.edges?.length) return null;

    return (
        <section>
            <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-[var(--color-primary)] pl-3">
                Relations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relations.edges.map((edge, i) => (
                    <Link
                        key={i}
                        href={`/anime/${edge.node.id}`}
                        className="group block relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1a1a2e]"
                    >
                        <img
                            src={edge.node.coverImage.large || edge.node.coverImage.medium || ""}
                            alt={edge.node.title.english || edge.node.title.romaji || "Anime"}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">
                                {edge.relationType.replace(/_/g, " ")}
                            </span>
                            <h4 className="text-sm font-semibold text-white line-clamp-2">
                                {edge.node.title.english || edge.node.title.romaji}
                            </h4>
                        </div>
                        {/* Static label for relation type visible always? Maybe just on hover is cleaner for discovery, but clearer usage is better. */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-medium">
                            {edge.relationType.replace(/_/g, " ")}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
