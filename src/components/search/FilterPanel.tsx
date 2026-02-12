"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GENRES, SEASONS, FORMATS, STATUSES, SORTS, YEARS } from "@/lib/constants";
import styles from "./FilterPanel.module.css";
import { cn } from "@/lib/utils";

export function FilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Local state for filters to avoid rapid URL updates
    const [filters, setFilters] = useState({
        genres: searchParams.getAll("genres"),
        season: searchParams.get("season") || "",
        year: searchParams.get("year") || "",
        format: searchParams.get("format") || "",
        status: searchParams.get("status") || "",
        sort: searchParams.get("sort") || "POPULARITY_DESC",
    });

    // Update local state when URL changes (e.g. back button)
    useEffect(() => {
        setFilters({
            genres: searchParams.getAll("genres"),
            season: searchParams.get("season") || "",
            year: searchParams.get("year") || "",
            format: searchParams.get("format") || "",
            status: searchParams.get("status") || "",
            sort: searchParams.get("sort") || "POPULARITY_DESC",
        });
    }, [searchParams]);

    const updateURL = (newFilters: typeof filters) => {
        const params = new URLSearchParams(searchParams.toString());

        // Clear existing
        params.delete("genres");
        params.delete("season");
        params.delete("year");
        params.delete("format");
        params.delete("status");
        params.delete("sort");
        params.delete("page"); // Reset page on filter change

        // Set new
        newFilters.genres.forEach(g => params.append("genres", g));
        if (newFilters.season) params.set("season", newFilters.season);
        if (newFilters.year) params.set("year", newFilters.year);
        if (newFilters.format) params.set("format", newFilters.format);
        if (newFilters.status) params.set("status", newFilters.status);
        if (newFilters.sort) params.set("sort", newFilters.sort);

        router.push(`/search?${params.toString()}`);
    };

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        updateURL(newFilters);
    };

    const toggleGenre = (genre: string) => {
        const current = filters.genres;
        const next = current.includes(genre)
            ? current.filter(g => g !== genre)
            : [...current, genre];

        const newFilters = { ...filters, genres: next };
        setFilters(newFilters);
        updateURL(newFilters);
    };

    const clearFilters = () => {
        const reset = {
            genres: [],
            season: "",
            year: "",
            format: "",
            status: "",
            sort: "POPULARITY_DESC",
        };
        setFilters(reset);
        updateURL(reset);
    };

    return (
        <div className={styles.container}>
            {/* Mobile Toggle */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                <SlidersHorizontal size={20} />
                Filters
            </button>

            {/* Panel Content */}
            <AnimatePresence>
                <div className={cn(styles.panel, isOpen && styles.panelOpen)}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>
                            <SlidersHorizontal size={18} /> Filters
                        </h3>
                        <button
                            onClick={clearFilters}
                            className={styles.clearBtn}
                        >
                            Clear All
                        </button>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className={styles.scrollContent}>
                        {/* Sort */}
                        <div className={styles.group}>
                            <label className={styles.label}>Sort By</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange("sort", e.target.value)}
                                className={styles.select}
                            >
                                {SORTS.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Genres */}
                        <div className={styles.group}>
                            <label className={styles.label}>Genres</label>
                            <div className={styles.genreGrid}>
                                {GENRES.map(genre => (
                                    <button
                                        key={genre}
                                        onClick={() => toggleGenre(genre)}
                                        className={cn(
                                            styles.genreTag,
                                            filters.genres.includes(genre) && styles.genreTagActive
                                        )}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Year & Season */}
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label className={styles.label}>Year</label>
                                <select
                                    value={filters.year}
                                    onChange={(e) => handleFilterChange("year", e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Any</option>
                                    {YEARS.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.group}>
                                <label className={styles.label}>Season</label>
                                <select
                                    value={filters.season}
                                    onChange={(e) => handleFilterChange("season", e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Any</option>
                                    {SEASONS.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Format & Status */}
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label className={styles.label}>Format</label>
                                <select
                                    value={filters.format}
                                    onChange={(e) => handleFilterChange("format", e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Any</option>
                                    {FORMATS.map(f => (
                                        <option key={f.value} value={f.value}>{f.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.group}>
                                <label className={styles.label}>Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange("status", e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Any</option>
                                    {STATUSES.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatePresence>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
