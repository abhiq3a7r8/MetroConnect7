import KeyboardScreenWrapper from "@/src/core/providers/Keyboard";
import LandingSplash from "../components/specific/LandingSplash";
import LoginBox from "../components/specific/LoginBox";

export default function LoginScreen() {
  return (
        <KeyboardScreenWrapper>
            <LandingSplash />
            <LoginBox />
        </KeyboardScreenWrapper>
    
  );
}
