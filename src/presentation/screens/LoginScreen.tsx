import KeyboardScreenWrapper from "@/src/core/providers/Keyboard";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useNotification } from "../../presentation/state/useNotification";
import LandingSplash from "../components/specific/LandingSplash";
import LoginBox from "../components/specific/LoginBox";

export default function LoginScreen() {
  const { notif, showNotification, hideNotification } = useNotification();

  const debugroute = () => {
    router.push('/dashboard')
  }

  return (
        <KeyboardScreenWrapper>
            <TouchableOpacity className="h-10 w-10 bg-red-200" onPress={debugroute}/>
            <LandingSplash />
            <LoginBox />
        </KeyboardScreenWrapper>
  );
}
