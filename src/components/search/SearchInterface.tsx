"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Loader2 } from "lucide-react";
import { AnimeCard } from "@/components/anime/AnimeCard";
import { fetchAnimePage } from "@/app/actions/anime";
import type { AniListMedia, PageInfo, SearchFilters } from "@/types/anilist";
import styles from "./SearchInterface.module.css";
import { FilterPanel } from "./FilterPanel";

interface SearchInterfaceProps {
    initialData: {
        media: AniListMedia[];
        pageInfo: PageInfo;
    };
    filters: SearchFilters;
}

export function SearchInterface({ initialData, filters }: SearchInterfaceProps) {
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(loadMoreRef);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isPending,
    } = useInfiniteQuery({
        queryKey: ["searchAnime", filters],
        queryFn: async ({ pageParam = 1 }) => {
            // If it's the first page and we have initial data, we usually don't need to fetch
            // But react-query handles this via initialData option.
            // However, for infinite query with server action, it's safer to just fetch.
            // Or we can rely on initialData being passed to the hook.
            return fetchAnimePage(pageParam as number, filters);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.pageInfo.hasNextPage) {
                return lastPage.pageInfo.currentPage + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        initialData: {
            pages: [initialData],
            pageParams: [1],
        },
    });

    // Infinite scroll trigger
    useEffect(() => {
        if (isInView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Flatten pages
    const allAnime = data?.pages.flatMap((page) => page.media) || [];

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <FilterPanel />
            </aside>

            <main className={styles.main}>
                <div className={styles.resultsHeader}>
                    <h1 className={styles.title}>
                        {filters.search ? `Results for "${filters.search}"` : "Explore Anime"}
                    </h1>
                    <span className={styles.count}>
                        {data?.pages[0]?.pageInfo.total || 0} results
                    </span>
                </div>

                {allAnime.length === 0 && !isPending ? (
                    <div className={styles.emptyState}>
                        <p>No anime found matching your criteria.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {allAnime.map((anime, index) => (
                            <AnimeCard key={`${anime.id}-${index}`} anime={anime} index={index} />
                        ))}
                    </div>
                )}

                {/* Load More Trigger */}
                <div ref={loadMoreRef} className={styles.loadMore}>
                    {isFetchingNextPage && (
                        <div className={styles.loader}>
                            <Loader2 className={styles.spinner} size={24} />
                            <span>Loading more...</span>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
