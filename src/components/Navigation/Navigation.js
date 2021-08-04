import React from "react";
import Logo from "../../assets/logo";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { queryAction } from "../../store/query-slice";
import { useDispatch } from "react-redux";
export default function Navigation() {
  const dispatch = useDispatch();
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" onClick={() => dispatch(queryAction.setQuery(""))}>
            <Logo />
          </Link>
        </li>
        <li className="nav__list--2">
          <Search />
        </li>
        <li>
          <span>My Account</span>
        </li>
        <li>
          <span>Watchlist (1)</span>
        </li>
      </ul>
    </nav>
  );
}
