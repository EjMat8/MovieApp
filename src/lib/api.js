import axios from "axios";
export const KEY = process.env.REACT_APP_MOVIE_API;
export const IMAGE_URL = "https://image.tmdb.org/t/p/";
export const GENRE_URL = `/genre/movie/list?api_key=${KEY}&language=en-US`;
export const VIDEO_URL = `/videos?api_key=${KEY}`;
export const DETAIL_URL = (type, id) =>
  `${type}/${id}?api_key=${KEY}&language=en-US`;
export const SEARCH_URL = (q, page) =>
  `/search/multi?api_key=${KEY}&language=en-US&query=${q}&page=${page}&include_adult=false&region=US`;
export const IMAGE_SIZES = {
  backdropSizes: ["w300", "w780", "w1280", "original"],
};
export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
