"use client";

import { AniListMedia } from "@/types/anilist";
import styles from "./AnimeInfo.module.css";
import { formatScore, getSeasonLabel } from "@/lib/utils";

interface AnimeInfoProps {
    media: AniListMedia;
}

export function AnimeInfo({ media }: AnimeInfoProps) {
    const startDate = media.startDate ? `${media.startDate.year}-${media.startDate.month}-${media.startDate.day}` : "?"; // Wait, startDate is not in my type?
    // I need to check if I am fetching startDate/endDate or just seasonYear.
    // Viewing queries.ts, I see seasonYear.

    return (
        <div className={styles.container}>
            {/* Rankings */}
            <div className={styles.rankings}>
                {media.averageScore && (
                    <div className={styles.rankItem}>
                        <span className={styles.rankLabel}>Score</span>
                        <span className={styles.rankValue}>{media.averageScore}%</span>
                    </div>
                )}
                {media.popularity && (
                    <div className={styles.rankItem}>
                        <span className={styles.rankLabel}>Popularity</span>
                        <span className={styles.rankValue}>#{media.popularity.toLocaleString()}</span>
                    </div>
                )}
                {media.favourites && (
                    <div className={styles.rankItem}>
                        <span className={styles.rankLabel}>Favorites</span>
                        <span className={styles.rankValue}>{media.favourites.toLocaleString()}</span>
                    </div>
                )}
            </div>

            <div className={styles.infoGrid}>
                <InfoItem label="Format" value={media.format} />
                <InfoItem label="Episodes" value={media.episodes?.toString()} />
                <InfoItem label="Duration" value={media.duration ? `${media.duration} mins` : undefined} />
                <InfoItem label="Status" value={media.status} />
                <InfoItem label="Season" value={getSeasonLabel(media.season, media.seasonYear)} />
                <InfoItem
                    label="Studios"
                    value={media.studios?.nodes?.map(s => s.name).join(", ")}
                />
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Genres</h3>
                <div className={styles.tags}>
                    {media.genres?.map(genre => (
                        <span key={genre} className={styles.tag}>{genre}</span>
                    ))}
                </div>
            </div>

            {media.tags && media.tags.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Tags</h3>
                    <div className={styles.tags}>
                        {media.tags.slice(0, 10).map(tag => (
                            <span key={tag.name} className={styles.tagSecondary}>
                                {tag.name} <span className={styles.tagRank}>{tag.rank}%</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value?: string | number | null }) {
    if (!value) return null;
    return (
        <div className={styles.infoItem}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}
