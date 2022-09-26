import { createSlice, Slice } from "@reduxjs/toolkit";
import { AppThunk } from "reducers";
import { Notification } from "types/notification";
let timeoutId: any = 0;

const notificationSlice: Slice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification: AppThunk = (
  notification: Notification,
  timePerSecond: number = 5
) => {
  return async (dispatch) => {
    clearTimeout(timeoutId);
    dispatch(addNotification(notification));
    timeoutId = setTimeout(
      () => dispatch(clearNotification(null)),
      timePerSecond * 1000
    );
  };
};

export default notificationSlice.reducer;
