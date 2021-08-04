import { movieActions } from "./movie-slice";
import movies, { KEY } from "../lib/api";
const tmdbLink = {
  trendingURL: `/trending/all/day?api_key=${KEY}`,
  moviesURL: `/movie/popular?api_key=${KEY}&language=en-US`,
  seriesURL: `/tv/popular?api_key=${KEY}&with_networks=49&language=en-US&page=1`,
  familyURL: `/discover/movie?api_key=${KEY}&with_genres=10751&language=en-US&page=2`,
  musicURL: `/discover/movie?api_key=${KEY}&with_genres=10402&language=en-US&include_adult=false`,
};
export const getMovie = (type) => async (dispatch, getState) => {
  const {
    data: { results },
  } = await movies.get(tmdbLink[`${type}URL`]);
  dispatch(movieActions.setMovies({ ...getState().movie, [type]: results }));
};
