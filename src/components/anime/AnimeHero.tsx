"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import styles from "./AnimeHero.module.css";
import { AniListMedia } from "@/types/anilist";
import { formatScore, getSeasonLabel } from "@/lib/utils";
import { Play, Heart, Plus, Share2 } from "lucide-react";
import Link from "next/link";

interface AnimeHeroProps {
    media: AniListMedia;
}

export function AnimeHero({ media }: AnimeHeroProps) {
    const { theme } = useTheme();

    // Use media color or fallback
    const accentColor = media.coverImage.color || "var(--color-primary)";

    // Format description (strip HTML)
    const description = media.description?.replace(/<[^>]*>?/gm, "") || "";
    const truncatedDesc = description.length > 250
        ? description.slice(0, 250) + "..."
        : description;

    return (
        <div className={styles.heroWrapper} style={{ "--hero-accent": accentColor } as React.CSSProperties}>
            {/* Background Banner */}
            <div className={styles.bannerContainer}>
                {media.bannerImage ? (
                    <img
                        src={media.bannerImage}
                        alt={media.title.english || media.title.romaji || "Banner"}
                        className={styles.bannerImage}
                    />
                ) : (
                    <div className={styles.bannerFallback} />
                )}
                <div className={styles.bannerOverlay} />
            </div>

            <div className={styles.contentContainer}>
                {/* Cover Image */}
                <motion.div
                    className={styles.coverWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={media.coverImage.extraLarge || media.coverImage.large || ""}
                        alt={media.title.english || "Cover"}
                        className={styles.coverImage}
                    />
                </motion.div>

                {/* Info */}
                <div className={styles.infoWrapper}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.breadcrumb}>
                            <Link href="/">Home</Link> /
                            <Link href="/search">Anime</Link> /
                            <span>{media.title.romaji}</span>
                        </div>

                        <h1 className={styles.title}>
                            {media.title.english || media.title.romaji}
                        </h1>
                        {media.title.native && (
                            <h2 className={styles.nativeTitle}>{media.title.native}</h2>
                        )}

                        <div className={styles.metaRow}>
                            {media.averageScore && (
                                <span className={styles.scoreBadge}>
                                    {formatScore(media.averageScore)}% Match
                                </span>
                            )}
                            <span className={styles.dot}>•</span>
                            <span>{media.format}</span>
                            <span className={styles.dot}>•</span>
                            <span>{media.episodes || "?"} eps</span>
                            <span className={styles.dot}>•</span>
                            <span>{media.status}</span>
                            <span className={styles.dot}>•</span>
                            <span>{getSeasonLabel(media.season, media.seasonYear)}</span>
                        </div>

                        <p className={styles.description}>{truncatedDesc}</p>

                        <div className={styles.actions}>
                            <button className={styles.btnPrimary}>
                                <Plus size={20} />
                                <span>Add to List</span>
                            </button>
                            <button className={styles.btnSecondary}>
                                <Heart size={20} />
                            </button>
                            <button className={styles.btnSecondary}>
                                <Share2 size={20} />
                            </button>
                            {media.trailer?.id && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${media.trailer.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.btnTrailer}
                                >
                                    <Play size={18} fill="currentColor" />
                                    <span>Trailer</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
