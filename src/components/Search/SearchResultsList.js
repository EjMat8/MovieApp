import React, { useState, useRef, useCallback } from "react";
import { useSearch } from "../../hooks/useSearch";
import { IMAGE_URL, IMAGE_SIZES } from "../../lib/api";
import ShowItem from "../Shows/ShowList/ShowItem";
import Loader from "../UI/Loader";
import ErrorM from "../UI/Error";
export default function SearchResultsList({ query }) {
  const [pageNum, setPageNum] = useState(1);
  const { loading, error, results, hasMore } = useSearch(query, pageNum);
  const observer = useRef();
  const lastShowElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="search-list">
      {results.length &&
        results.map((el, i) => {
          return (
            <ShowItem
              key={el.id}
              id={el.id}
              ref={results.length === i + 1 ? lastShowElementRef : null}
              imageURL={`${IMAGE_URL}${IMAGE_SIZES.backdropSizes[1]}${
                el.backdrop_path || el.poster_path
              }`}
              title={el.title || el.name}
              category={el.media_type}
            />
          );
        })}
      {loading && <Loader />}
      {error && <ErrorM message="Could not find what you were looking for!" />}
    </div>
  );
}
