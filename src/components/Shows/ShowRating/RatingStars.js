import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactStars from "react-rating-stars-component";
import movies, { RATE_URL } from "../../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuestsShow } from "../../../store/rate-action";

const ratingVariant = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.1,
    },
  },
  exit: {
    y: "100vh",
  },
};

function RatingStars({ setRate, auth, rateParams }) {
  const [rated, setRated] = useState(false);
  const [val, setVal] = useState(0);
  const { rated: rateState } = useSelector((state) => state);
  let value;
  if (auth.isLoggedIn)
    value = rateState[rateParams?.category][rateParams?.showID]?.rating;
  else value = null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (rated && auth.isLoggedIn)
      setTimeout(() => {
        setRated(false);
        dispatch(
          fetchGuestsShow(
            auth.sessionID,
            rateParams?.category,
            rateParams?.showID
          )
        );
      }, 2000);
  }, [
    rated,
    dispatch,
    auth.sessionID,
    rateParams?.category,
    auth.isLoggedIn,
    rateParams?.showID,
  ]);

  const ratingChanged = (newRating) => {
    if (!auth.isLoggedIn) setRate(true);
    else {
      movies
        .post(
          RATE_URL(rateParams),
          { value: newRating * 2 },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        )
        .then(() => {
          setRated(true);
          setVal(newRating);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <React.Fragment>
      {!rateState.isLoading ? (
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={30}
          value={value ? value / 2 : 0}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          color="#ccc"
        />
      ) : (
        <div style={{ color: "#fff" }}>Checking Ratings...</div>
      )}
      <AnimatePresence exitBeforeEnter>
        {rated && (
          <motion.div
            key="rated"
            className="rated"
            variants={ratingVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span
              style={{
                backgroundColor: "#0f0f0f",
                padding: "1rem 2rem",
                borderRadius: 5,
              }}
            >
              {val}/5
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}

export default React.memo(RatingStars);
