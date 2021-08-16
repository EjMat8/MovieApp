import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchResultsList from "../components/Search/SearchResultsList";
import { WATCHLIST_URL } from "../lib/api";

export default function ListPage() {
  const { auth } = useSelector((state) => state);
  const { type } = useParams();
  const url = useCallback(
    (page = 1) => `${WATCHLIST_URL(auth.sessionID, type)}&page=${page}`,
    [auth.sessionID, type]
  );
  return <SearchResultsList url={url} type={type} />;
}
