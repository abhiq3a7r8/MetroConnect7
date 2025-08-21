import NotificationContainer from "@/src/presentation/components/generic/notification/NotificationContainer";
import { createContext, ReactNode, useContext } from "react";
import { useNotification } from "../../presentation/state/useNotification";

type NotificationContextType = {
  notif: any;
  showNotification: (message: string, type?: "info" | "error" | "success", duration?: number) => void;
  hideNotification: () => void;
};


type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);


export function NotificationProvider({ children }: NotificationProviderProps) {
  const { notif, showNotification, hideNotification } = useNotification();

  return (
    <NotificationContext.Provider value={{notif , showNotification, hideNotification }}>
      {children}
      <NotificationContainer notif={notif} onHide={hideNotification} />
    </NotificationContext.Provider>
  );
}

export const useNotify = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotify must be used inside a NotificationProvider");
  }
  return ctx;
};

