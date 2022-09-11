import { configureStore, Store } from "@reduxjs/toolkit";
import notificationReducer from "./notification";

const store: Store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
