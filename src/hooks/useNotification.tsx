import { showNotification } from "../redux/features/notificationSlice";
import { useAppDispatch } from "../redux/store";
import { Notification } from "../utils/types/Notification";
export function useNotification(): (notification: Notification) => void {
  const dispatch = useAppDispatch();

  function show(notification: Notification): void {
    showNotification(notification)(dispatch);
  }

  return show;
}
