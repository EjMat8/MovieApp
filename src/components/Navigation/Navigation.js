import React, { useState } from "react";
import Logo from "../../assets/logo";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useHistory, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import { authActions } from "../../store/auth-slice";
import { queryAction } from "../../store/query-slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
export default function Navigation() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const { auth } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [hoverEl, setHoverEl] = useState(false);
  const onClickHandler = (op) => {
    setOpen(op);
  };
  return (
    <React.Fragment>
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
          <motion.li
            className="nav__auth"
            onHoverStart={() => {
              setHoverEl(true);
            }}
            onHoverEnd={() => {
              setHoverEl(false);
            }}
          >
            <Link
              to={auth.isLoggedIn ? "/account" : "/auth"}
              onClick={() => dispatch(queryAction.setQuery(""))}
            >
              {auth.isLoggedIn
                ? auth.isGuest
                  ? "Guest Account"
                  : "My Account"
                : "Login"}
            </Link>
            <AnimatePresence>
              {auth.isLoggedIn && hoverEl && (
                <motion.div
                  key="logout"
                  className="nav__logout"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch(authActions.signOut());
                      history.replace("/");
                      localStorage.removeItem("login");
                    }}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>

          <li>
            <Link
              to={
                auth.isLoggedIn && !auth.isGuest
                  ? "/account-watchlist"
                  : pathname
              }
              onClick={() => {
                onClickHandler(true);
                dispatch(queryAction.setQuery(""));
              }}
            >
              Watchlist (0)
            </Link>
          </li>
        </ul>
      </nav>
      {(!auth.isLoggedIn || auth.isGuest) && open && (
        <Modal onClick={onClickHandler.bind(null, false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <p>You need to sign in with a TMDB account to access this page</p>
            <button className="btn " onClick={onClickHandler.bind(null, false)}>
              Okay
            </button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}
