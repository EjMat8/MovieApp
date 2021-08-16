import React, { useState } from "react";
import { useSelector } from "react-redux";
import backdrop from "../../assets/backdrop.png";
import { IMAGE_URL, IMAGE_SIZES } from "../../lib/api";
import ShowTrailer from "../Shows/ShowDetails/ShowTrailer";
import { FaPlay, FaStar } from "react-icons/fa";
import RatingStars from "../Shows/ShowRating/RatingStars";
import Modal from "../UI/Modal";
import { addToWatchList } from "../../lib/action";

const Details = ({ selectedShow, genre, isLoading, type }) => {
  const [trailer, openTrailer] = useState(false);
  const [rate, setRate] = useState(false);
  const [list, setList] = useState(false);
  const [added, setAdded] = useState(false);
  const { auth } = useSelector((state) => state);

  const onClickHandler = () => {
    setRate(false);
    setList(false);
  };

  const rateParams = {
    category: type,
    showID: selectedShow.id,
    guest: auth.isGuest,
    sessionID: auth.sessionID,
  };
  const imageUrl = `${IMAGE_URL}/${IMAGE_SIZES.backdropSizes[1]}/${
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
            <button
              className="btn"
              onClick={() => {
                openTrailer(true);
              }}
            >
              <FaPlay /> Trailer
            </button>
            <button
              className="btn btn--circle"
              onClick={() => {
                setList(true);
                if (auth.isLoggedIn && !auth.isGuest)
                  addToWatchList(auth.sessionID, selectedShow.id, type).then(
                    () => setAdded(true)
                  );
              }}
            >
              +
            </button>

            <RatingStars
              auth={auth}
              setRate={setRate}
              rateParams={auth.isLoggedIn ? rateParams : null}
            />

            {(list || rate) && !auth.isLoggedIn && (
              <Modal onClick={onClickHandler}>
                <div
                  className="modal__content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>
                    {rate
                      ? "Login as guest or with a tmdb account"
                      : list
                      ? "Login with tmdb account"
                      : ""}
                  </p>
                </div>
              </Modal>
            )}
            {auth.isLoggedIn && auth.isGuest && list && (
              <Modal onClick={onClickHandler}>
                <div
                  className="modal__content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>Cannot add to watchlist if you are signed in as guest!</p>
                </div>
              </Modal>
            )}
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
      {added && (
        <Modal onClick={setAdded.bind(null, false)}>
          <div className="modal__content">ADDED TO WATCHLIST!</div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Details;
