import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export const useMovieList = (category) => {
  const [movies, setMovies] = useState([]);
  const { movie } = useSelector((state) => state);
  const getMovies = useCallback(
    (select) => {
      setMovies(movie[select]);
    },
    [movie]
  );

  useEffect(() => {
    getMovies(category);
  }, [category, getMovies]);
  return [movies, getMovies];
};
