import { configureStore, Store } from "@reduxjs/toolkit";
import notificationReducer from "./notification";
import userReducer from "./user";

const store: Store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
