import { ActionCreator, createSlice, AnyAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import userService from "services/users";
import authService from "services/auth";
import { IAuth } from "types/token";
import { AppDispatch, RootState } from "reducers";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const initializeLoginUser: ActionCreator<AnyAction> = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    const token = getCookie("token");

    if (token && typeof token === "string") {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));

      if (decodedJwt.exp * 1000 < Date.now()) {
        return dispatch(logoutUser());
      }

      if (getState()?.user) {
        return;
      }

      try {
        const user = await userService.get(decodedJwt.id);

        if (!user) {
          return dispatch(logoutUser());
        }

        dispatch(setUser(user));
      } catch (error) {
        dispatch(logoutUser());
      }
    }
  };
};

export const registerUser: ActionCreator<AnyAction> = (user: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await authService.register(user);

      dispatch(setUser(response));
    } catch (error) {
      throw error;
    }
  };
};

export const loginUser: ActionCreator<AnyAction> = (user: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await authService.login(user);

      if (!response) {
        return dispatch(logoutUser());
      }

      dispatch(setUser(response));
    } catch (error) {
      throw error;
    }
  };
};

export const logoutUser: ActionCreator<AnyAction> = () => {
  return (dispatch: AppDispatch) => {
    deleteCookie("token");
    dispatch(setUser(null));
  };
};

export const updateUser: ActionCreator<AnyAction> = (id: string, user: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userService.update(id, user);

      dispatch(setUser(response));
    } catch (error) {
      throw error;
    }
  };
};

export default userSlice.reducer;
