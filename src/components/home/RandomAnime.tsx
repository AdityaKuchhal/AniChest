"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Star, ExternalLink } from "lucide-react";
import { getRandomAnime } from "@/lib/anilist";
import {
    getTitle,
    formatScore,
    stripHtml,
    truncateText,
    getFormatLabel,
} from "@/lib/utils";
import type { AniListMedia } from "@/types/anilist";
import styles from "./RandomAnime.module.css";

export function RandomAnime() {
    const [anime, setAnime] = useState<AniListMedia | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShuffle = async () => {
        setIsLoading(true);
        setIsFlipped(false);

        try {
            const result = await getRandomAnime();
            setTimeout(() => {
                setAnime(result);
                setIsFlipped(true);
                setIsLoading(false);
            }, 300);
        } catch {
            setIsLoading(false);
        }
    };

    const title = anime ? getTitle(anime.title) : "";
    const score = anime ? formatScore(anime.averageScore) : "";
    const description = anime?.description
        ? truncateText(stripHtml(anime.description), 120)
        : "";
    const coverUrl =
        anime?.coverImage?.extraLarge || anime?.coverImage?.large || "";

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.titleIcon}>🎲</span>
                        Feeling Lucky?
                    </h2>
                    <p className={styles.subtitle}>
                        Discover something new with a random anime pick
                    </p>
                </div>

                <div className={styles.content}>
                    {/* Card */}
                    <div className={styles.cardContainer}>
                        <AnimatePresence mode="wait">
                            {!isFlipped || !anime ? (
                                <motion.div
                                    key="front"
                                    className={styles.cardFront}
                                    initial={{ rotateY: 0, opacity: 1 }}
                                    exit={{ rotateY: 90, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={styles.cardFrontContent}>
                                        <Shuffle
                                            size={48}
                                            className={`${styles.shuffleIcon} ${isLoading ? styles.spinning : ""}`}
                                        />
                                        <span className={styles.cardFrontText}>
                                            {isLoading ? "Finding..." : "?"}
                                        </span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="back"
                                    className={styles.cardBack}
                                    initial={{ rotateY: -90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <Link href={`/anime/${anime.id}`} className={styles.cardLink}>
                                        {coverUrl && (
                                            <Image
                                                src={coverUrl}
                                                alt={title}
                                                fill
                                                sizes="220px"
                                                className={styles.cardImage}
                                            />
                                        )}
                                        <div className={styles.cardOverlay}>
                                            <ExternalLink size={20} />
                                        </div>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Info (shown when flipped) */}
                    <AnimatePresence>
                        {isFlipped && anime && (
                            <motion.div
                                className={styles.animeInfo}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <h3 className={styles.animeTitle}>{title}</h3>
                                <div className={styles.animeMeta}>
                                    {anime.format && (
                                        <span className={styles.badge}>
                                            {getFormatLabel(anime.format)}
                                        </span>
                                    )}
                                    {anime.episodes && (
                                        <span className={styles.badge}>
                                            {anime.episodes} eps
                                        </span>
                                    )}
                                    {anime.averageScore && (
                                        <span className={styles.scoreBadge}>
                                            <Star size={12} fill="currentColor" />
                                            {score}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.animeGenres}>
                                    {anime.genres?.slice(0, 4).map((genre) => (
                                        <span key={genre} className={styles.genreTag}>
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                                {description && (
                                    <p className={styles.animeDesc}>{description}</p>
                                )}
                                <Link
                                    href={`/anime/${anime.id}`}
                                    className={styles.viewBtn}
                                >
                                    View Details
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Shuffle Button */}
                    <motion.button
                        className={styles.shuffleBtn}
                        onClick={handleShuffle}
                        disabled={isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Shuffle size={20} />
                        {anime ? "Shuffle Again" : "Roll the Dice"}
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
