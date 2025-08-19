import { ReactNode } from "react";
import { View } from "react-native";

type CardProps = {
  children: ReactNode;  
};

export default function ScreenWrapper({ children }: CardProps) {
  return <View className="bg-white h-auto w-[90%] rounded-[10] justify-evenly items-center p-4 gap-4">{children}</View>;
}
