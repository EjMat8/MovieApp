import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie-slice";
import queryReducer from "./query-slice";
export default configureStore({
  reducer: { movie: movieReducer, query: queryReducer },
});
