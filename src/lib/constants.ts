export const GENRES = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
];

export const SEASONS = [
    { value: "WINTER", label: "Winter" },
    { value: "SPRING", label: "Spring" },
    { value: "SUMMER", label: "Summer" },
    { value: "FALL", label: "Fall" },
];

export const FORMATS = [
    { value: "TV", label: "TV Show" },
    { value: "MOVIE", label: "Movie" },
    { value: "TV_SHORT", label: "TV Short" },
    { value: "SPECIAL", label: "Special" },
    { value: "OVA", label: "OVA" },
    { value: "ONA", label: "ONA" },
    { value: "MUSIC", label: "Music" },
];

export const STATUSES = [
    { value: "RELEASING", label: "Airing" },
    { value: "FINISHED", label: "Finished" },
    { value: "NOT_YET_RELEASED", label: "Upcoming" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "HIATUS", label: "Hiatus" },
];

export const SORTS = [
    { value: "POPULARITY_DESC", label: "Most Popular" },
    { value: "SCORE_DESC", label: "Highest Rated" },
    { value: "TRENDING_DESC", label: "Trending" },
    { value: "FAVOURITES_DESC", label: "Most Favorites" },
    { value: "START_DATE_DESC", label: "Newest" },
    { value: "START_DATE", label: "Oldest" },
    { value: "TITLE_ENGLISH", label: "Title (A-Z)" },
];

export const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 1 - i);
