import { ratedActions } from "./rate-slice";
import movies, { RATED_GUEST_URL } from "../lib/api";
export const fetchGuestsRated = (id) => async (dispatch) => {
  dispatch(ratedActions.setLoading(true));
  const data = await movies.get(RATED_GUEST_URL(id, "movie"));
  const data2 = await movies.get(RATED_GUEST_URL(id, "tv"));

  dispatch(ratedActions.setRatedMovies(data.data.results));
  dispatch(ratedActions.setRatedTV(data2.data.results));

  dispatch(ratedActions.setLoading(false));
};

export const fetchGuestsShow = (id, type, showID) => async (dispatch) => {
  const data = await movies.get(RATED_GUEST_URL(id, type));

  dispatch(
    ratedActions.updateShowRating({
      type,
      results: data.data.results,
      id: showID,
    })
  );
};
