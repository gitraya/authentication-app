import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const initializeLoginUser = () => {
  return async (dispatch: any) => {
    const token = getCookie("token");

    if (token && typeof token === "string") {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));

      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
      } else {
        const user = await axios.get(`/users/${decodedJwt.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (user.data) {
          dispatch(setUser(user.data));
        }
      }
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch: any) => {
    const user = await loginService.login({
      email,
      password,
    });

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
    return user;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
