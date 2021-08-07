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
import AuthPage from "./pages/AuthPage";
import { authActions } from "./store/auth-slice";
import AccountPage from "./pages/AccountPage";
import { fetchGuestsRated } from "./store/rate-action";

export default function App() {
  const dispatch = useDispatch();
  const { movie, auth } = useSelector((state) => state);
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
    const auth = JSON.parse(localStorage.getItem("login"));
    if (!auth) return;
    if (new Date(auth.expiresAt).getTime() <= new Date().getTime()) {
      localStorage.removeItem("login");
      return;
    }
    dispatch(authActions.signIn(auth));
  }, [dispatch, getAllMovieData]);

  useEffect(() => {
    if (auth.isLoggedIn && auth.isGuest) {
      dispatch(fetchGuestsRated(auth.sessionID));
    }
  }, [auth.isLoggedIn, auth.isGuest, auth.sessionID, dispatch]);
  return (
    <Layout>
      {Object.values(movie).every((el) => !!el.length) ? (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/account">
            <AccountPage />
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
