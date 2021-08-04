import React from "react";
import { Link } from "react-router-dom";
import backdrop from "../../assets/backdrop.png";
export default function MovieDisplayItem({ imageURL, title, id }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <Link to={`/show/trending/${id}`}>
        <img src={backdrop} alt="backdrop" className="backdrop" />
        <img
          src={imageURL}
          alt="display movie"
          className="movie-display__img"
        />
        <h1 className="heading-1">{title}</h1>
      </Link>
    </div>
  );
}
