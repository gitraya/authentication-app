import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../types/notification";
let timeoutId: any = 0;

const notificationSlice: any = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (
  notification: Notification,
  timePerSecond: number = 5
) => {
  return async (dispatch: any) => {
    clearTimeout(timeoutId);
    dispatch(addNotification(notification));
    timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      timePerSecond * 1000
    );
  };
};

export default notificationSlice.reducer;
