import { ReactNode } from "react";
import { View } from "react-native";

type CardProps = {
  children: ReactNode;
  bg?: string; // optional bg override
};

export default function Card({ children, bg = "bg-white" }: CardProps) {
  return (
    <View
      className={`${bg} h-auto w-[90%] rounded-xl justify-evenly items-center p-4 gap-4`}
    >
      {children}
    </View>
  );
}
