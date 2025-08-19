import { ReactNode } from "react";
import { View } from "react-native";

type ScreenWrapperProps = {
  children: ReactNode;
};

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  return <View className="flex-1 items-center justify-evenly bg-zinc-100">{children}</View>
}
