import { View } from "react-native";
import Ptext from "./PoppinsText";

type HeaderProps = {
  title: string;
  subtitle?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function Header({
  title,
  subtitle,
  containerClassName,
  titleClassName,
  subtitleClassName,
}: HeaderProps) {
  return (
    <View className={`w-full mt-3 ${containerClassName ?? ""}`}>
      <Ptext className={`text-xl ${titleClassName ?? ""}`}>{title}</Ptext>
      {subtitle && (
        <Ptext className={`text-sm text-gray-500 ${subtitleClassName ?? ""}`}>
          {subtitle}
        </Ptext>
      )}
    </View>
  );
}
