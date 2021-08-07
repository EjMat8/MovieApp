import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/auth-action";
export default function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  const guestOnClickHandler = () => {
    dispatch(signIn(history));
  };
  return (
    <React.Fragment>
      <button onClick={guestOnClickHandler} className="btn">
        Sign in as guest
      </button>
      <button className="btn btn--fill">Log in with TMDB account</button>
    </React.Fragment>
  );
}
