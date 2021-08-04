import React, { useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import { DETAIL_URL } from "../../lib/api";
import Details from "../Details/Details";
import Loader from "../UI/Loader";
export default function SearchDetail({
  id,
  category,
  data: { data, isLoading },
  genre,
}) {
  const [res, getRes] = useHttp();
  useEffect(() => {
    getRes(DETAIL_URL(category, id), "get");
  }, [getRes, category, id]);
  if (!res.data.data || res.isLoading) return <Loader />;
  return (
    <Details
      selectedShow={res.data.data}
      genre={genre(data, res.data.data)}
      isLoading={isLoading}
      type={category}
    />
  );
}

//

//const Details = ({ selectedShow, genre, isLoading, type })
