"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Info,
    Star,
    Tv,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    getTitle,
    formatScore,
    stripHtml,
    truncateText,
    getFormatLabel,
} from "@/lib/utils";
import type { AniListMedia } from "@/types/anilist";
import styles from "./HeroCarousel.module.css";

interface HeroCarouselProps {
    anime: AniListMedia[];
}

export function HeroCarousel({ anime }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const current = anime[currentIndex];
    if (!current) return null;

    const title = getTitle(current.title);
    const score = formatScore(current.averageScore);
    const description = current.description
        ? truncateText(stripHtml(current.description), 200)
        : "";
    const bannerUrl =
        current.bannerImage ||
        current.coverImage?.extraLarge ||
        "";

    const goTo = useCallback(
        (index: number) => {
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
        },
        [currentIndex]
    );

    const goNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % anime.length);
    }, [anime.length]);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex(
            (prev) => (prev - 1 + anime.length) % anime.length
        );
    }, [anime.length]);

    // Auto-advance
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(goNext, 8000);
        return () => clearInterval(timer);
    }, [goNext, isPaused]);

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? "-30%" : "30%",
            opacity: 0,
        }),
    };

    return (
        <section
            className={styles.hero}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={styles.bgWrap}
                >
                    {bannerUrl && (
                        <Image
                            src={bannerUrl}
                            alt={title}
                            fill
                            priority
                            sizes="100vw"
                            className={styles.bgImage}
                        />
                    )}
                    <div className={styles.bgOverlay} />
                    <div className={styles.bgGradient} />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.container}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={styles.info}
                        >
                            {/* Spotlight Label */}
                            <motion.span
                                className={styles.spotlightLabel}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                #{currentIndex + 1} Spotlight
                            </motion.span>

                            {/* Title */}
                            <h1 className={styles.title}>{title}</h1>

                            {/* Meta */}
                            <div className={styles.meta}>
                                {current.format && (
                                    <span className={styles.metaItem}>
                                        <Tv size={14} />
                                        {getFormatLabel(current.format)}
                                    </span>
                                )}
                                {current.episodes && (
                                    <span className={styles.metaItem}>
                                        <Play size={14} fill="currentColor" />
                                        {current.episodes} Episodes
                                    </span>
                                )}
                                {current.seasonYear && (
                                    <span className={styles.metaItem}>
                                        <Calendar size={14} />
                                        {current.season
                                            ? `${current.season.charAt(0)}${current.season.slice(1).toLowerCase()} `
                                            : ""}
                                        {current.seasonYear}
                                    </span>
                                )}
                                {current.averageScore && (
                                    <span className={styles.scoreBadge}>
                                        <Star size={14} fill="currentColor" />
                                        {score}
                                    </span>
                                )}
                            </div>

                            {/* Genre Badges */}
                            <div className={styles.genres}>
                                {current.genres?.slice(0, 4).map((genre) => (
                                    <span key={genre} className={styles.genreBadge}>
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            {description && (
                                <p className={styles.description}>{description}</p>
                            )}

                            {/* CTA Buttons */}
                            <div className={styles.ctas}>
                                <Link
                                    href={`/anime/${current.id}`}
                                    className={styles.ctaPrimary}
                                >
                                    <Play size={16} fill="currentColor" />
                                    Watch Now
                                </Link>
                                <Link
                                    href={`/anime/${current.id}`}
                                    className={styles.ctaSecondary}
                                >
                                    <Info size={16} />
                                    Detail
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goPrev}
                className={`${styles.arrow} ${styles.arrowLeft}`}
                aria-label="Previous"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={goNext}
                className={`${styles.arrow} ${styles.arrowRight}`}
                aria-label="Next"
            >
                <ChevronRight size={24} />
            </button>

            {/* Progress Dots */}
            <div className={styles.dots}>
                {anime.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ""}`}
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        {i === currentIndex && (
                            <motion.div
                                className={styles.dotProgress}
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: isPaused ? 0 : 8,
                                    ease: "linear",
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
