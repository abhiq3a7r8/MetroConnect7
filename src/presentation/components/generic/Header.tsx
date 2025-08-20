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
    <View className={`w-full px-4 mt-3 bg-white ${containerClassName ?? ""}`}>
      <Ptext className={`text-xl ${titleClassName ?? ""}`}>{title}</Ptext>
      {subtitle && (
        <Ptext className={`text-sm text-gray-500 ${subtitleClassName ?? ""}`}>
          {subtitle}
        </Ptext>
      )}
    </View>
  );
}
