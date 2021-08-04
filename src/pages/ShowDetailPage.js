import React, { useEffect } from "react";
import { useParams } from "react-router";
import { GENRE_URL } from "../lib/api";
import { useHttp } from "../hooks/useHttp";
import ShowDetail from "../components/Shows/ShowDetails/ShowDetail";
import SearchDetail from "../components/Search/SearchDetail";
export default function ShowDetailPage() {
  const { category, id } = useParams();
  const [data, getData] = useHttp();
  useEffect(() => {
    getData(GENRE_URL, "get");
  }, [getData]);

  const genre = (results, select) => {
    return results?.data?.genres
      .filter(
        (el) =>
          select?.genre_ids?.includes(el.id) ||
          select?.genres?.map((sel) => sel.id)?.includes(el.id)
      )
      .map((el) => el.name)
      .join(" ");
  };

  const props = {
    category,
    id,
    data,
    genre,
  };
  if (category !== "movie" && category !== "tv")
    return <ShowDetail {...props} />;
  else return <SearchDetail {...props} />;
}
