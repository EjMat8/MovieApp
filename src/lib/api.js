import axios from "axios";
export const KEY = process.env.REACT_APP_MOVIE_API;
export const IMAGE_URL = "https://image.tmdb.org/t/p/";
export const GENRE_URL = `/genre/movie/list?api_key=${KEY}&language=en-US`;
export const VIDEO_URL = `/videos?api_key=${KEY}`;
export const AUTH_GUEST_URL = `authentication/guest_session/new?api_key=${KEY}`;
export const AUTH_URL = `authentication/token/new?api_key=${KEY}`;
export const AUTH_SIGN_IN_URL = `authentication/session/new?api_key=${KEY}`;

export const RATE_URL = ({ category, showID, guest, sessionID }) =>
  `/${category}/${showID}/rating?api_key=${KEY}&${
    guest ? "guest_" : ""
  }session_id=${sessionID}`;

export const RATED_GUEST_URL = (id, type) =>
  `/guest_session/${id}/rated/${
    type === "movie" ? "movies" : "tv"
  }?api_key=${KEY}&language=en-US&sort_by=created_at.asc`;

export const RATED_ACC_URL = (accId, type, page = 1) =>
  `/account/{account_id}/rated/${
    type === "movie" ? "movies" : "tv"
  }?api_key=${KEY}&language=en-US&session_id=${accId}&sort_by=created_at.asc&page=${page}`;

export const DETAIL_URL = (type, id) =>
  `${type}/${id}?api_key=${KEY}&language=en-US`;

export const SEARCH_URL = (q, page) =>
  `/search/multi?api_key=${KEY}&language=en-US&query=${q}&page=${page}&include_adult=false&region=US`;
export const IMAGE_SIZES = {
  backdropSizes: ["w300", "w780", "w1280", "original"],
};

export const DELETE_RATE_URL = (type, id, authId, isGuest) =>
  `${type}/${id}/rating?api_key=${KEY}&${
    isGuest ? "guest_" : ""
  }session_id=${authId}`;

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
