"use client";

import { AniListMedia } from "@/types/anilist";
import Link from "next/link";
import styles from "./GridSection.module.css"; // Reusing a grid style? Or create new.
// Let's create a generic grid style or use inline/tailwind.

export function CharacterGrid({ characters }: { characters?: AniListMedia["characters"] }) {
    if (!characters?.edges?.length) return <div className="text-gray-500">No characters found.</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {characters.edges.slice(0, 12).map((edge, i) => ( // Limit to 12 for performance/layout
                <div key={i} className="bg-[#1a1a2e] rounded-lg overflow-hidden flex shadow-md hover:scale-[1.02] transition-transform">
                    <div className="w-16 h-24 flex-shrink-0">
                        <img
                            src={edge.node.image.medium || ""}
                            alt={edge.node.name.full || "Character"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-3 flex flex-col justify-center min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{edge.node.name.full}</h4>
                        <span className="text-xs text-gray-400">{edge.role}</span>
                    </div>
                </div>
            ))}
            {/* If more than 12, show 'view all' button later */}
        </div>
    );
}
