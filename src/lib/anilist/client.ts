import { GraphQLClient } from "graphql-request";

const ANILIST_API = "https://graphql.anilist.co";

export const anilistClient = new GraphQLClient(ANILIST_API, {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
