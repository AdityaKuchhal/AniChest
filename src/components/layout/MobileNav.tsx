"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Sparkles, Bookmark, User } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./MobileNav.module.css";

const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/ai/recommend", label: "AI", icon: Sparkles },
    { href: "/watchlist", label: "List", icon: Bookmark },
    { href: "/profile", label: "Profile", icon: User },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className={styles.mobileNav}>
            {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    >
                        <div className={styles.iconWrap}>
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            {isActive && (
                                <motion.div
                                    className={styles.activeGlow}
                                    layoutId="mobile-nav-glow"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </div>
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
