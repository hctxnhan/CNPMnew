import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../../utils/types/Notification";
import { RootState } from "../store";
import { v4 as uuid } from "uuid";

interface NotificationState {
  notificationList: Notification[];
}

const initialState: NotificationState = {
  notificationList: [],
};

export const filterSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notificationList.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notificationList = state.notificationList.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } = filterSlice.actions;
export const notificationReducer = filterSlice.reducer;
export const selectNotificationList = (state: RootState): Notification[] =>
  state.notification.notificationList;
export const selectNotificationById = (
  state: RootState,
  id: string
): Notification | undefined =>
  state.notification.notificationList.find(
    (notification) => notification.id === id
  );

export function showNotification(
  notification: Notification
): (dispatch: any) => void {
  const id = uuid();
  const newNotification = { ...notification, id };
  return (dispatch: any) => {
    dispatch(addNotification(newNotification));
    setTimeout(() => {
      dispatch(removeNotification(newNotification.id));
    }, 3000);
  };
}
