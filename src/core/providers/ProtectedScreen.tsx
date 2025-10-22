import ErrorScreen from "@/presentation/screens/ErrorScreen";
import { useRouter } from "expo-router";
import React from "react";
import { useAuthContext } from "./AuthProvider";

interface ProtectedScreenProps {
  children: React.ReactNode;
}

export default function ProtectedScreen({ children }: ProtectedScreenProps) {
  const router = useRouter();
  const { user } = useAuthContext();

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
