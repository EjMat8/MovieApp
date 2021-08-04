import React from "react";
import { useSelector } from "react-redux";
import MovieDisplay from "../components/MovieDisplay/MovieDisplay";
import ShowLists from "../components/Shows/ShowList/ShowLists";

export default function Home() {
  const { movie } = useSelector((state) => state);
  const categories = Object.keys(movie);
  return (
    <React.Fragment>
      <MovieDisplay />
      {Object.values(movie).map((el, i) => (
        <ShowLists key={categories[i]} category={categories[i]} data={el} />
      ))}
    </React.Fragment>
  );
}
