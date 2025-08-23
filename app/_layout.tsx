import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Text, View } from "react-native";
import "../global.css";
import { AuthProvider } from "../src/core/providers/AuthProvider";
import { NotificationProvider } from "../src/core/providers/Notification";
import RootLayoutNav from "../src/core/providers/RootLayoutNav";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <NotificationProvider>
          <RootLayoutNav />
      </NotificationProvider>
    </AuthProvider>
  );
}
