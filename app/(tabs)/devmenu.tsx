import { useAuthContext } from "@/src/core/providers/AuthProvider";
import KeyboardScreenWrapper from "@/src/core/providers/Keyboard";
import LongButton from "@/src/presentation/components/generic/LongButton";
import React from "react";

export default function Devmenu() {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <KeyboardScreenWrapper>
      <LongButton title="Logout" onPress={handleLogout} />
    </KeyboardScreenWrapper>
  );
}
