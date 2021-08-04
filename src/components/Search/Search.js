import React from "react";
import { GoSearch } from "react-icons/go";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { queryAction } from "../../store/query-slice";

export default function Search() {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { term: query } = useSelector((state) => state.query);

  const onChangeHander = (e) => {
    dispatch(queryAction.setQuery(e.target.value));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        history.replace(`/search?q=${query}`);
      }
      if (!query.trim()) {
        if (pathname.indexOf("/") !== pathname.lastIndexOf("/"))
          history.replace(pathname);
        else history.replace("/");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query, history, pathname]);
  return (
    <React.Fragment>
      <GoSearch className="search__icon" />
      <input
        type="text"
        className="search__input"
        value={query}
        onChange={onChangeHander}
      />
    </React.Fragment>
  );
}
