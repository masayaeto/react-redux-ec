import {signInAction} from "./actions";
import {push} from "connected-react-router";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignIn = state.users.isSignedIn;

    if (!isSignIn) {
      const url= "https://api.github.com/users/masayaeto";

      const response = await fetch(url).then(res => res.json()).catch(() => null);
      console.log(response);

      const username = response.name;

      dispatch(signInAction({
        isSignedIn: true,
        uid: "00001",
        username: username
      }))
    }
    dispatch(push("/"))
  }
}