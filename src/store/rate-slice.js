import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const ratedInit = {
  movie: {},
  tv: {},
  isLoading: false,
};

const ratedSlice = createSlice({
  name: "rated",
  initialState: ratedInit,
  reducers: {
    setRatedMovies(state, action) {
      state.movie = _.mapKeys(action.payload, "id");
    },
    setRatedTV(state, action) {
      state.tv = _.mapKeys(action.payload, "id");
    },

    updateShowRating(state, action) {
      state[action.payload.type] = {
        ...state[action.payload.type],
        [action.payload.id]: action.payload.results.find(
          (el) => el.id === action.payload.id
        ),
      };
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const ratedActions = ratedSlice.actions;

export default ratedSlice.reducer;
