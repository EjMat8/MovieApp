import { createSlice } from "@reduxjs/toolkit";

const movieDefault = {
  trending: [],
  movies: [],
  series: [],
  family: [],
  music: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState: movieDefault,
  reducers: {
    setMovies(state, action) {
      state.trending = action.payload.trending;
      state.movies = action.payload.movies;
      state.series = action.payload.series;
      state.family = action.payload.family;
      state.music = action.payload.music;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
