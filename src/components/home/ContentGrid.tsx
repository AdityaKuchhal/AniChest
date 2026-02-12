"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimeCard } from "@/components/anime/AnimeCard";
import type { AniListMedia } from "@/types/anilist";
import styles from "./ContentGrid.module.css";

interface Tab {
    key: string;
    label: string;
    icon: string;
    data: AniListMedia[];
    href: string;
}

interface ContentGridProps {
    tabs: Tab[];
}

export function ContentGrid({ tabs }: ContentGridProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");
    const activeData = tabs.find((t) => t.key === activeTab)?.data || [];
    const activeHref =
        tabs.find((t) => t.key === activeTab)?.href || "/search";

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Tab Headers */}
                <div className={styles.tabBar}>
                    <div className={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                            >
                                <span className={styles.tabIcon}>{tab.icon}</span>
                                <span>{tab.label}</span>
                                {activeTab === tab.key && (
                                    <motion.div
                                        className={styles.tabIndicator}
                                        layoutId="content-tab-indicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    <Link href={activeHref} className={styles.viewMore}>
                        View more
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Grid Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className={styles.grid}
                    >
                        {activeData.map((anime, index) => (
                            <AnimeCard key={anime.id} anime={anime} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
