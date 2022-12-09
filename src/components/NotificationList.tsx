import { selectNotificationList } from "../redux/features/notificationSlice";
import { useAppSelector } from "../redux/store";
import { NotificationItem } from "./ShowNotification";

export function NotificationList(): JSX.Element {
  const notifications = useAppSelector(selectNotificationList);
  return (
    <div className="fixed top-2 right-2 w-[300px] flex flex-col gap-1.5 z-30">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} id={notification.id} />
      ))}
    </div>
  );
}
