"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AnimeTabs.module.css";
import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
}

interface AnimeTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function AnimeTabs({ tabs, activeTab, onTabChange }: AnimeTabsProps) {
    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabsList}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            styles.tabBtn,
                            activeTab === tab.id && styles.active
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className={styles.indicator}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
