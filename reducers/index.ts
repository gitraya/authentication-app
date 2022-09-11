import { configureStore, Store } from "@reduxjs/toolkit";
import notificationReducer from "./notification";
import userReducer from "./user";

const store: Store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;
