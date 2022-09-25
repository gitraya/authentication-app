import { ActionCreator, AnyAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "reducers";
import { Notification } from "types/notification";
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

export const setNotification: ActionCreator<AnyAction> = (
  notification: Notification,
  timePerSecond: number = 5
) => {
  return async (dispatch: AppDispatch) => {
    clearTimeout(timeoutId);
    dispatch(addNotification(notification));
    timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      timePerSecond * 1000
    );
  };
};

export default notificationSlice.reducer;
