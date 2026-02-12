"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeCard } from "@/components/anime/AnimeCard";
import type { AniListMedia } from "@/types/anilist";
import styles from "./TrendingSection.module.css";

interface TrendingSectionProps {
    anime: AniListMedia[];
    title?: string;
}

export function TrendingSection({
    anime,
    title = "Trending",
}: TrendingSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth * 0.8;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
        setTimeout(updateScrollState, 400);
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.titleIcon}>🔥</span>
                    {title}
                </h2>
                <div className={styles.arrows}>
                    <button
                        onClick={() => scroll("left")}
                        className={`${styles.arrow} ${!canScrollLeft ? styles.arrowDisabled : ""}`}
                        disabled={!canScrollLeft}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className={`${styles.arrow} ${!canScrollRight ? styles.arrowDisabled : ""}`}
                        disabled={!canScrollRight}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className={styles.scrollContainer}
                onScroll={updateScrollState}
            >
                {anime.map((item, index) => (
                    <div key={item.id} className={styles.cardWrap}>
                        <AnimeCard anime={item} index={index} showRank variant="compact" />
                    </div>
                ))}
            </div>
        </section>
    );
}
