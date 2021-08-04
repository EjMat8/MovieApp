import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import ShowDetailPage from "./pages/ShowDetailPage";
import { getMovie } from "./store/movie-action";
import Loader from "./components/UI/Loader";
export default function App() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);
  const getAllMovieData = useCallback(() => {
    dispatch(getMovie("trending"));
    dispatch(getMovie("series"));
    dispatch(getMovie("latestMovies"));
    dispatch(getMovie("latestSeries"));
    dispatch(getMovie("movies"));
    dispatch(getMovie("family"));
    dispatch(getMovie("music"));
  }, [dispatch]);
  useEffect(() => {
    getAllMovieData();
  }, [dispatch, getAllMovieData]);
  return (
    <Layout>
      {Object.values(movie).every((el) => !!el.length) ? (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/show/:category/:id">
            <ShowDetailPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}
