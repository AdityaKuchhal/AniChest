"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Play, Tv, Film, Clock } from "lucide-react";
import { getTitle, formatScore, getFormatLabel } from "@/lib/utils";
import type { AniListMedia } from "@/types/anilist";
import styles from "./AnimeCard.module.css";

interface AnimeCardProps {
    anime: AniListMedia;
    index?: number;
    showRank?: boolean;
    variant?: "default" | "compact" | "wide";
}

export function AnimeCard({
    anime,
    index = 0,
    showRank = false,
    variant = "default",
}: AnimeCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const title = getTitle(anime.title);
    const score = formatScore(anime.averageScore);
    const coverUrl =
        anime.coverImage?.extraLarge || anime.coverImage?.large || "";
    const accentColor = anime.coverImage?.color || "var(--color-primary)";

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const formatIcon =
        anime.format === "MOVIE" ? (
            <Film size={12} />
        ) : (
            <Tv size={12} />
        );

    return (
        <motion.div
            ref={cardRef}
            className={`${styles.card} ${styles[variant]}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
                transition: "transform 0.15s ease-out",
            }}
        >
            <Link href={`/anime/${anime.id}`} className={styles.link}>
                {/* Image Container */}
                <div className={styles.imageWrap}>
                    {coverUrl && (
                        <Image
                            src={coverUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                            className={styles.image}
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div className={styles.overlay} />

                    {/* Rank Badge */}
                    {showRank && index !== undefined && (
                        <div className={styles.rank}>
                            <span className={styles.rankNumber}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>
                    )}

                    {/* Score Badge */}
                    {anime.averageScore && (
                        <div className={styles.scoreBadge}>
                            <Star size={10} fill="currentColor" />
                            <span>{score}</span>
                        </div>
                    )}

                    {/* Hover Info */}
                    <motion.div
                        className={styles.hoverInfo}
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.hoverGenres}>
                            {anime.genres?.slice(0, 3).map((genre) => (
                                <span key={genre} className={styles.genreBadge}>
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <div className={styles.hoverMeta}>
                            {anime.format && (
                                <span className={styles.metaItem}>
                                    {formatIcon}
                                    {getFormatLabel(anime.format)}
                                </span>
                            )}
                            {anime.episodes && (
                                <span className={styles.metaItem}>
                                    <Play size={10} fill="currentColor" />
                                    {anime.episodes} eps
                                </span>
                            )}
                            {anime.duration && (
                                <span className={styles.metaItem}>
                                    <Clock size={10} />
                                    {anime.duration}m
                                </span>
                            )}
                        </div>

                        {anime.studios?.nodes?.[0] && (
                            <span className={styles.studio}>
                                {anime.studios.nodes[0].name}
                            </span>
                        )}
                    </motion.div>

                    {/* Glow border on hover */}
                    <div
                        className={styles.glowBorder}
                        style={{
                            opacity: isHovered ? 1 : 0,
                            borderColor: accentColor,
                            boxShadow: `0 0 20px ${accentColor}40`,
                        }}
                    />
                </div>

                {/* Title Section */}
                <div className={styles.info}>
                    <h3 className={styles.title}>{title}</h3>
                    {variant !== "compact" && (
                        <div className={styles.subtitle}>
                            {anime.seasonYear && <span>{anime.seasonYear}</span>}
                            {anime.season && anime.seasonYear && <span>•</span>}
                            {anime.format && <span>{getFormatLabel(anime.format)}</span>}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
