import { memo } from "react";
import { selectNotificationById } from "../redux/features/notificationSlice";
import { useAppSelector } from "../redux/store";
import { NotificationType } from "../utils/types/Notification";
import clsx from "clsx";
interface NotificationProps {
  id: string;
}

const notificationStyle: {
  [key in NotificationType]: string;
} = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

function Notification({ id }: NotificationProps): JSX.Element {
  const notification = useAppSelector((state) =>
    selectNotificationById(state, id)
  );

  const style =
    notification !== undefined && notificationStyle[notification.type];

  return (
    <div className={clsx(style, "p-2 bg-opacity-95 text-white rounded-md")}>
      <p>{notification?.message}</p>
    </div>
  );
}

export const NotificationItem = memo(Notification);
