import { gql } from "graphql-request";

/* === Fragment for common media fields === */
export const MEDIA_FRAGMENT = gql`
  fragment MediaFields on Media {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    description
    averageScore
    meanScore
    popularity
    favourites
    episodes
    duration
    format
    status
    season
    seasonYear
    genres
    studios(isMain: true) {
      nodes {
        name
      }
    }
    nextAiringEpisode {
      episode
      timeUntilAiring
    }
  }
`;

/* === Homepage Queries === */

export const TRENDING_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query TrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

export const TOP_AIRING_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query TopAiring($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, status: RELEASING, sort: SCORE_DESC, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

export const MOST_POPULAR_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query MostPopular($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

export const MOST_FAVORITE_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query MostFavorite($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: FAVOURITES_DESC, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

export const LATEST_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query LatestAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: START_DATE_DESC, status: RELEASING, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

/* === Search Query === */

export const SEARCH_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query SearchAnime(
    $page: Int
    $perPage: Int
    $search: String
    $genre_in: [String]
    $seasonYear: Int
    $season: MediaSeason
    $format: MediaFormat
    $status: MediaStatus
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        type: ANIME
        search: $search
        genre_in: $genre_in
        seasonYear: $seasonYear
        season: $season
        format: $format
        status: $status
        sort: $sort
        isAdult: false
      ) {
        ...MediaFields
      }
    }
  }
`;

/* === Detail Query === */

export const ANIME_DETAIL_QUERY = gql`
  query AnimeDetail($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      description
      averageScore
      meanScore
      popularity
      favourites
      episodes
      duration
      format
      status
      season
      seasonYear
      genres
      tags {
        name
        rank
      }
      studios {
        nodes {
          name
        }
      }
      characters(sort: ROLE, perPage: 12) {
        edges {
          node {
            name {
              full
            }
            image {
              large
              medium
            }
          }
          role
        }
      }
      relations {
        edges {
          node {
            id
            title {
              romaji
              english
            }
            coverImage {
              medium
              large
            }
            type
            format
          }
          relationType
        }
      }
      recommendations(perPage: 8) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
            }
            coverImage {
              medium
              large
            }
          }
        }
      }
      stats {
        scoreDistribution {
          score
          amount
        }
      }
      nextAiringEpisode {
        episode
        timeUntilAiring
      }
    }
  }
`;

/* === Random Anime Query === */

export const RANDOM_ANIME_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query RandomAnime($page: Int) {
    Page(page: $page, perPage: 1) {
      media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;
