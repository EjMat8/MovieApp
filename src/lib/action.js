import movies from "./api";

export const addToWatchList = async (id, showID, type) =>
  movies.post(
    `account/{account_id}/watchlist?api_key=${process.env.REACT_APP_MOVIE_API}&session_id=${id}`,
    { media_type: type, media_id: showID, watchlist: true },
    { "Content-Type": "application/json;charset=utf-8" }
  );
