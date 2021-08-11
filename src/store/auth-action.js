import { authActions } from "./auth-slice";
import movies, { AUTH_GUEST_URL, AUTH_SIGN_IN_URL, AUTH_URL } from "../lib/api";
export const signIn = (history) => async (dispatch, getState) => {
  const data = await movies.get(AUTH_GUEST_URL);
  dispatch(
    authActions.signIn({
      isGuest: true,
      sessionID: data.data.guest_session_id,
      expiresAt: data.data.expires_at,
    })
  );
  localStorage.setItem("login", JSON.stringify(getState().auth));
  history.push("/");
};

export const accountRequestToken = () => async () => {
  const data = await movies.get(AUTH_URL);
  const reqToken = { requestToken: data.data.request_token };

  if (JSON.parse(localStorage.getItem("token")))
    localStorage.removeItem("token");

  localStorage.setItem("token", JSON.stringify(reqToken));
  window.location.href = `https://www.themoviedb.org/authenticate/${data.data.request_token}?redirect_to=http://movie-up1.netlfiy.app/auth/approved`;
};

export const accountSignIn = () => async (dispatch, getState) => {
  const res = JSON.parse(localStorage.getItem("token"));
  const reqToken = res;

  const data = await movies.post(AUTH_SIGN_IN_URL, {
    request_token: reqToken.requestToken,
  });
  console.log(data);
  dispatch(
    authActions.signIn({ isGuest: false, sessionID: data.data.session_id })
  );
  localStorage.removeItem("token");
  localStorage.setItem("login", JSON.stringify(getState().auth));
};
