"use client";

import { useState } from "react";
import { AniListMedia } from "@/types/anilist";
import { AnimeTabs } from "./AnimeTabs";
import { CharacterGrid } from "./CharacterGrid";
import { Relations } from "./Relations";
import { Recommendations } from "./Recommendations";
import { motion, AnimatePresence } from "framer-motion";

interface AnimeDetailClientProps {
    media: AniListMedia;
}

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "characters", label: "Characters" },
    { id: "staff", label: "Staff" },
    { id: "reviews", label: "Reviews" },
];

export function AnimeDetailClient({ media }: AnimeDetailClientProps) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div>
            <AnimeTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === "overview" && (
                        <div className="space-y-12">
                            {/* Synopsis is already in Hero, but usually Overview has more detail or just the Relations/Recs */}
                            {/* Actually Hero truncated the description. Full description here? */}
                            {/* Let's put Relations and Recs here for now */}

                            <Relations relations={media.relations} />
                            <Recommendations recommendations={media.recommendations} />
                        </div>
                    )}

                    {activeTab === "characters" && (
                        <CharacterGrid characters={media.characters} />
                    )}

                    {activeTab === "staff" && (
                        <div className="text-gray-400 text-center py-10">Staff feature coming soon...</div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="text-gray-400 text-center py-10">Reviews feature coming soon...</div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
