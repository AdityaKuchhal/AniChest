import type { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
    title: "AniChest — AI-Powered Anime Discovery",
    description:
        "Discover your next favorite anime with AI-powered recommendations, mood-based discovery, and advanced search. Explore trending, top airing, and popular anime.",
    keywords: [
        "anime",
        "manga",
        "anime recommendations",
        "AI anime",
        "anime discovery",
        "anime search",
        "anime streaming",
        "AniChest",
    ],
    openGraph: {
        title: "AniChest — AI-Powered Anime Discovery",
        description:
            "Discover your next favorite anime with AI-powered recommendations and advanced search.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
            <body>
                <Providers>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100vh",
                        }}
                    >
                        <Navbar />
                        <main style={{ flex: 1, paddingTop: "var(--navbar-height)" }}>
                            {children}
                        </main>
                        <Footer />
                        <MobileNav />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
