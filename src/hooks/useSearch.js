import axios from "axios";
import { useEffect, useState } from "react";
import movies, { SEARCH_URL } from "../lib/api";
import _ from "lodash";

export const useSearch = (query, pageNum, url = null) => {
  const [loading, isLoading] = useState(true);
  const [error, hasError] = useState(false);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [query, url]);

  useEffect(() => {
    isLoading(true);
    hasError(false);
    let cancel;
    const getResults = async () => {
      const selectURL = !url ? SEARCH_URL(query, pageNum) : url(pageNum);
      try {
        const { data } = await movies.get(selectURL, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setHasMore(data.page < data.total_pages);
        setResults((prevResults) => {
          if (!url)
            return _.uniqBy(
              [
                ...prevResults,
                ...data.results.filter(
                  (el) => el.media_type === "movie" || el.media_type === "tv"
                ),
              ],
              "id"
            );
          else return [...prevResults, ...data.results];
        });
        isLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) return;
        hasError(true);
      }
    };
    getResults();
    return () => cancel();
  }, [query, pageNum, url]);

  return { loading, error, results, hasMore };
};
