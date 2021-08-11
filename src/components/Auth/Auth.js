import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, accountRequestToken } from "../../store/auth-action";
export default function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();

  const guestOnClickHandler = () => {
    dispatch(signIn(history));
  };
  const accountOnClickHandler = () => {
    dispatch(accountRequestToken());
  };
  return (
    <React.Fragment>
      <button onClick={guestOnClickHandler} className="btn">
        Sign in as guest
      </button>
      <button onClick={accountOnClickHandler} className="btn btn--fill">
        Log in with TMDB account
      </button>
    </React.Fragment>
  );
}
