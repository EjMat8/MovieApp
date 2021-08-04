// import faker from "faker";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useMovieList } from "../../hooks/useMovieList";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import MovieDisplayItem from "./MovieDisplayItem";

import { IMAGE_URL, IMAGE_SIZES } from "../../lib/api";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default function MovieDisplay() {
  const displayMovies = useMovieList("trending")[0].slice(0, 5);

  const movies = displayMovies.map((el) => (
    <MovieDisplayItem
      key={el.id}
      imageURL={`${IMAGE_URL}/${IMAGE_SIZES.backdropSizes[3]}/${
        el.backdrop_path || el.poster_path
      }`}
      title={el.title || el.original_title}
      id={el.id}
    />
  ));
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, movies.length, page);
  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 4000);
    return () => {
      clearInterval(interval);
    };
  }, [paginate]);
  return (
    <div className="movie-display">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          className="movie-display__contain"
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {movies[imageIndex]}
        </motion.div>
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <BsChevronRight />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <BsChevronLeft />
      </div>
    </div>
  );
}
//
// <div className="movie-display__heading">
//
// </div>
// <motion.img
//   key={page}
//   alt="new movie"
//   className="movie-display__img"
//   src={images[imageIndex]}
//   custom={direction}
//   variants={variants}
//   initial="enter"
//   animate="center"
//   exit="exit"
//   transition={{
//     x: { type: "spring", stiffness: 300, damping: 30 },
//     opacity: { duration: 0.2 },
//   }}
// />
