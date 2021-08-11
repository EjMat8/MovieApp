import { ratedActions } from "./rate-slice";
import movies, {
  RATED_GUEST_URL,
  DELETE_RATE_URL,
  RATED_ACC_URL,
} from "../lib/api";
export const fetchRated = (id, isGuest) => async (dispatch) => {
  dispatch(ratedActions.setLoading(true));
  const rated_url = isGuest ? RATED_GUEST_URL : RATED_ACC_URL;
  const data = await movies.get(rated_url(id, "movie"));
  const data2 = await movies.get(rated_url(id, "tv"));

  dispatch(ratedActions.setRatedMovies(data.data.results));
  dispatch(ratedActions.setRatedTV(data2.data.results));

  dispatch(ratedActions.setLoading(false));
};

export const fetchShow = (id, type, showID, isGuest) => async (dispatch) => {
  const rated_url = isGuest ? RATED_GUEST_URL : RATED_ACC_URL;
  const data = await movies.get(rated_url(id, type));

  dispatch(
    ratedActions.updateShowRating({
      type,
      results: data.data.results,
      id: showID,
    })
  );
};

export const deleteRating = (type, id) => async (dispatch, getState) => {
  dispatch(ratedActions.deleteRating({ type, id }));
  await movies.delete(
    DELETE_RATE_URL(
      type,
      id,
      getState().auth.sessionID,
      getState().auth.isGuest
    )
  );
};
