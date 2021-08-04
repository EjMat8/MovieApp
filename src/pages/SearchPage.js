import React from "react";
import { useLocation } from "react-router";

import SearchResultsList from "../components/Search/SearchResultsList";
export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  return <SearchResultsList query={query} />;
}
