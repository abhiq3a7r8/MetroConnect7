import KeyboardScreenWrapper from "@/src/core/providers/Keyboard";
import ProtectedScreen from "@/src/core/providers/ProtectedScreen";
import { router } from "expo-router";
import Card from "../components/generic/Card";
import Header from "../components/generic/Header";
import LongButton from "../components/generic/LongButton";

export default function DashboardScreen() {
  return (
    <ProtectedScreen>
      <KeyboardScreenWrapper>
        <Card>
          <Header title="Find your Metro" subtitle="choose an origin and destination"/>
          <LongButton title="go to Profile" onPress={() => router.replace('/profile')}></LongButton>


        </Card>
      </KeyboardScreenWrapper>
    </ProtectedScreen>
  );
}
