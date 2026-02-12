"use client";

import Link from "next/link";
import {
    Github,
    Twitter,
    Heart,
    Sparkles,
    Search,
    Shuffle,
    Brain,
    ImageIcon,
} from "lucide-react";
import styles from "./Footer.module.css";

const footerLinks = {
    explore: [
        { href: "/", label: "Home" },
        { href: "/search", label: "Browse Anime" },
        { href: "/random", label: "Random Anime" },
        { href: "/search?sort=TRENDING_DESC", label: "Trending" },
        { href: "/search?sort=POPULARITY_DESC", label: "Most Popular" },
    ],
    aiTools: [
        { href: "/ai/recommend", label: "AI Recommender", icon: Sparkles },
        { href: "/ai/mood", label: "Mood Discovery", icon: Brain },
        { href: "/ai/scene", label: "Find by Scene", icon: ImageIcon },
    ],
    genres: [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Thriller",
    ],
};

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>⛩️</span>
                            <span className={styles.logoText}>
                                Ani<span className={styles.logoAccent}>Chest</span>
                            </span>
                        </Link>
                        <p className={styles.tagline}>
                            AI-powered anime discovery platform. Find your next favorite anime
                            with smart recommendations, mood-based search, and more.
                        </p>
                        <div className={styles.socialLinks}>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Explore Column */}
                    <div className={styles.linkCol}>
                        <h4 className={styles.colTitle}>Explore</h4>
                        <ul className={styles.linkList}>
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Tools Column */}
                    <div className={styles.linkCol}>
                        <h4 className={styles.colTitle}>AI Tools</h4>
                        <ul className={styles.linkList}>
                            {footerLinks.aiTools.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            <Icon size={14} />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Genres Column */}
                    <div className={styles.linkCol}>
                        <h4 className={styles.colTitle}>Genres</h4>
                        <div className={styles.genreTags}>
                            {footerLinks.genres.map((genre) => (
                                <Link
                                    key={genre}
                                    href={`/search?genres=${genre}`}
                                    className={styles.genreTag}
                                >
                                    {genre}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} AniChest. Made with{" "}
                        <Heart size={12} className={styles.heartIcon} /> •
                        Powered by{" "}
                        <a
                            href="https://anilist.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.anilistLink}
                        >
                            AniList
                        </a>
                    </p>
                    <p className={styles.disclaimer}>
                        AniChest is not affiliated with AniList. All anime data is provided
                        by the AniList API.
                    </p>
                </div>
            </div>
        </footer>
    );
}
