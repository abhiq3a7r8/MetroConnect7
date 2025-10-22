import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuthContext } from "./AuthProvider";

export default function RootLayoutNav() {
  const { user, loading, error } = useAuthContext(); // 👈 assuming you expose loginError
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // wait until finished loading

    if (user) {
      router.replace("/(tabs)");
    } else if (!error) {
      // only redirect to auth if this isn't an explicit login failure
      router.replace("/(auth)");
    }
    // if loginError exists -> stay put
  }, [user, loading, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
