import axios from "axios";
import { useEffect, useState } from "react";
import movies, { SEARCH_URL } from "../lib/api";
import _ from "lodash";

export const useSearch = (query, pageNum) => {
  const [loading, isLoading] = useState(true);
  const [error, hasError] = useState(false);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [query]);

  useEffect(() => {
    isLoading(true);
    hasError(false);
    let cancel;
    const getResults = async () => {
      try {
        const { data } = await movies.get(SEARCH_URL(query, pageNum), {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setHasMore(data.page < data.total_pages);
        setResults((prevResults) =>
          _.uniqBy(
            [
              ...prevResults,
              ...data.results.filter(
                (el) => el.media_type === "movie" || el.media_type === "tv"
              ),
            ],
            "id"
          )
        );
        isLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) return;
        hasError(true);
      }
    };
    getResults();
    return () => cancel();
  }, [query, pageNum]);

  return { loading, error, results, hasMore };
};
