import { Notification } from "../types/Notification";

export function successNotificationCreator(message: string): Notification {
  return {
    id: "",
    message,
    type: "success",
  };
}

export function errorNotificationCreator(message: string): Notification {
  return {
    id: "",
    message,
    type: "error",
  };
}
