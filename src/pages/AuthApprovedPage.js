import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountSignIn } from "../store/auth-action";
import Loader from "../components/UI/Loader";

export default function AuthApprovedPage() {
  const { auth } = useSelector((state) => state);

  const { request } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token")) && request === "approved")
      dispatch(accountSignIn());
  }, [dispatch, request]);

  return (
    <React.Fragment>
      {JSON.parse(localStorage.getItem("token")) && !auth.sessionID ? (
        <Loader />
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
}
