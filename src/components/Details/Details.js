import React, { useState } from "react";
import backdrop from "../../assets/backdrop.png";
import { IMAGE_URL, IMAGE_SIZES } from "../../lib/api";
import ShowTrailer from "../Shows/ShowDetails/ShowTrailer";
import { FaPlay, FaStar } from "react-icons/fa";
const Details = ({ selectedShow, genre, isLoading, type }) => {
  const [trailer, openTrailer] = useState(false);
  const imageUrl = `${IMAGE_URL}/${IMAGE_SIZES.backdropSizes[2]}/${
    selectedShow.backdrop_path || selectedShow.poster_path
  }`;
  return (
    <React.Fragment>
      <div className="show-detail">
        <img src={backdrop} alt="backdrop" className="backdrop" />
        {!imageUrl.includes("null") ? (
          <img src={imageUrl} alt="detail pic" className="show-detail__img" />
        ) : (
          <div
            className="show-detail__img"
            style={{ backgroundImage: "radial-gradient(#0f0f0f,#191919)" }}
          ></div>
        )}
        <div className="show-detail__info">
          <h1 className="heading-1">
            {selectedShow.name ||
              selectedShow.title ||
              selectedShow.original_title}
          </h1>
          <div className="show-detail__actions">
            <button className="btn btn--fill">
              <FaPlay /> Play
            </button>
            <button className="btn" onClick={() => openTrailer(true)}>
              <FaPlay /> Trailer
            </button>
            <button className="btn btn--circle">+</button>
          </div>
          <span className="show-detail__about">
            {selectedShow.release_date || selectedShow.first_air_date || "TBA"}
            &nbsp; | &nbsp;
            <FaStar /> {selectedShow.vote_average} &nbsp; | &nbsp;
            {isLoading ? "Genre" : genre}
          </span>
          <p className="show-detail__overview">{selectedShow.overview}</p>
        </div>
      </div>
      {trailer && (
        <ShowTrailer
          type={type}
          id={selectedShow.id}
          onClick={openTrailer.bind(null, false)}
        />
      )}
    </React.Fragment>
  );
};

export default Details;
