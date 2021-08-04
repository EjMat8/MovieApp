import React, { useCallback } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer";
import { useLocation } from "react-router";

export default function Layout(props) {
  const { pathname } = useLocation();
  const checkPath = useCallback(
    () => pathname.indexOf("/") === pathname.lastIndexOf("/"),
    [pathname]
  );
  return (
    <React.Fragment>
      <Navigation />
      <main>{props.children}</main>
      {checkPath() && <Footer />}
    </React.Fragment>
  );
}
