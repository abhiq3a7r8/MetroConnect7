import React from "react";
import Notification from "./Notification";

type NotifType = {
  message: string;
  type?: "info" | "success" | "error";
  duration?: number;
};

type NotificationContainerProps = {
  notif: NotifType | null;
  onHide: () => void;
};

export default function NotificationContainer({
  notif,
  onHide,
}: NotificationContainerProps) {
  if (!notif) return null;

  return (
    <Notification
      message={notif.message}
      type={notif.type ?? "info"}
      duration={notif.duration ?? 3000}
      onHide={onHide}
    />
  );
}
