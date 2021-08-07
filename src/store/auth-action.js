import { authActions } from "./auth-slice";
import movies, { AUTH_GUEST_URL } from "../lib/api";
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
