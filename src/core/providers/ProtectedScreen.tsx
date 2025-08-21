import LongButton from "@/src/presentation/components/generic/LongButton";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { Images } from "../../shared/constants/images";
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
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <Image
          source={Images.warning}
          className="h-24 w-24 opacity-80 rounded-2xl mb-10"
        />
        <Text className="text-center text-base mb-4 text-gray-800">
          You must be logged in to view this screen
        </Text>

        <LongButton
          onPress={() => router.push("/")}
          title="go to login"
        ></LongButton>
      </View>
    );
  }

  return <>{children}</>;
}
