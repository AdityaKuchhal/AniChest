import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatScore(score: number | null | undefined): string {
    if (!score) return "N/A";
    return (score / 10).toFixed(1);
}

export function formatNumber(num: number | null | undefined): string {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
}

export function getSeasonName(season: string | null | undefined): string {
    if (!season) return "";
    const map: Record<string, string> = {
        WINTER: "Winter",
        SPRING: "Spring",
        SUMMER: "Summer",
        FALL: "Fall",
    };
    return map[season] || season;
}

export function getFormatLabel(format: string | null | undefined): string {
    if (!format) return "";
    const map: Record<string, string> = {
        TV: "TV",
        TV_SHORT: "TV Short",
        MOVIE: "Movie",
        SPECIAL: "Special",
        OVA: "OVA",
        ONA: "ONA",
        MUSIC: "Music",
    };
    return map[format] || format;
}

export function getStatusColor(status: string | null | undefined): string {
    if (!status) return "var(--text-secondary)";
    const map: Record<string, string> = {
        RELEASING: "var(--color-success)",
        FINISHED: "var(--color-primary)",
        NOT_YET_RELEASED: "var(--color-warning)",
        CANCELLED: "var(--color-danger)",
        HIATUS: "var(--color-warning)",
    };
    return map[status] || "var(--text-secondary)";
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "...";
}

export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

export function getTitle(title: {
    english?: string | null;
    romaji?: string | null;
    native?: string | null;
}): string {
    return title.english || title.romaji || title.native || "Unknown";
}
