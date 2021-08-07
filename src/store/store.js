import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie-slice";
import queryReducer from "./query-slice";
import authReducer from "./auth-slice";
import ratedReducer from "./rate-slice";
export default configureStore({
  reducer: {
    movie: movieReducer,
    query: queryReducer,
    auth: authReducer,
    rated: ratedReducer,
  },
});
