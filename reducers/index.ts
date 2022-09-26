import { configureStore, Store } from "@reduxjs/toolkit";
import notificationReducer from "./notification";
import userReducer from "reducers/user";

const store: Store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export type AppThunk = (
  ...args: any[]
) => (dispatch: AppDispatch, getState?: RootState) => void;
export type AnyPromise = (...args: any[]) => Promise<any> | any;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch | AnyPromise;

export default store;
