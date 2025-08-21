import KeyboardScreenWrapper from "@/src/core/providers/Keyboard";
import ProtectedScreen from "@/src/core/providers/ProtectedScreen";
import { router } from "expo-router";
import Card from "../components/generic/Card";
import Header from "../components/generic/Header";
import LongButton from "../components/generic/LongButton";

export default function ProfileScreen() {
  return (
    <ProtectedScreen>
      <KeyboardScreenWrapper>
        <Card>
          <Header containerClassName="bg-green-200" title="Find your Profile" subtitle="choose an origin and destination"/>
          <LongButton title="go to Dashboard" onPress={() => router.replace('/dashboard')}></LongButton>
          
        </Card>
      </KeyboardScreenWrapper>
    </ProtectedScreen>
  );
}
