import { useCallback, useState } from "react";

export function useNotification() {
  const [notif, setNotif] = useState(null);

  const showNotification = useCallback((message, type = "info", duration = 3000) => {
    setNotif({ message, type, duration });
  }, []);

  const hideNotification = useCallback(() => {
    setNotif(null);
  }, []);

  return { notif, showNotification, hideNotification };
}
