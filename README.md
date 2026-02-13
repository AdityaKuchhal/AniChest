# AniChest — Next-Gen Anime Discovery 💎

![AniChest Hero](public/hero-preview.png)

**AniChest** is a modern, cinematic anime discovery platform built with **Next.js 15**, **Tailwind CSS v4**, and the **AniList GraphQL API**. It features an immersive "dark-first" design, 3D interactive cards, and (coming soon) AI-powered recommendations.

## ✨ Features

- **Cinematic Homepage**: Full-bleed hero carousel with parallax effects and glassmorphism overlays.
- **3D Anime Cards**: Interactive cards with depth, tilt, and holographic hover effects.
- **Dynamic Theming**: Detail pages automatically adapt their color scheme based on the anime's cover art.
- **Advanced Search**: Filter by season, genre, year, format, and status with real-time results.
- **Rich Details**: Comprehensive anime info including characters, staff, relations, and recommendations.
- **Responsive Design**: Mobile-first layout with smooth touch interactions and bottom navigation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) + [GraphQL Request](https://github.com/jasonkuhrt/graphql-request)
- **API**: [AniList GraphQL](https://anilist.co/graphiql)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm or npm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AdityaKuchhal/AniChest.git
    cd AniChest
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**:
    Copy the template and add your keys (optional for basic features, required for AI).
    ```bash
    cp .env.local.example .env.local
    ```
    *Note: AniList API is free and requires no key for read-only access.*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔮 Roadmap

- [x] **Phase 1-3**: Foundation, Homepage, Core Layout
- [x] **Phase 4**: Advanced Search & Discovery
- [x] **Phase 5**: Detail Pages (Dynamic Theming, Characters, Relations)
- [ ] **Phase 6**: AI Features (Recommender, Mood Discovery)
- [ ] **Phase 7**: User System (Auth, Watchlist, Reviews)
- [ ] **Phase 8**: Social Features (Live Watch, Threads)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Based on the AniList API. Not affiliated with AniList.
