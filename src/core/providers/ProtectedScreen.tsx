import ErrorScreen from "@/src/presentation/screens/ErrorScreen";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuthContext } from "./AuthProvider";
import { useNotify } from "./Notification";

interface ProtectedScreenProps {
  children: React.ReactNode;
}

export default function ProtectedScreen({ children }: ProtectedScreenProps) {
  const router = useRouter();
  const { showNotification } = useNotify();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      showNotification("Unauthorized access!", "error");
      
      
    }
  }, [user]);

  if (!user) {
    return (
      <ErrorScreen
          message="You must be logged in to view this screen"
          buttonTitle="Go to Login"
          onPress={() => router.push("/")}
    />
    );
  }

  return <>{children}</>;
}
