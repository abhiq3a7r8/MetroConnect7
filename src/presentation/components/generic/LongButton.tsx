import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Ptext from "./PText";

type LongButtonProps = TouchableOpacityProps & {
  title: string;
};

export default function LongButton({ title, style, ...rest }: LongButtonProps) {
  return (
    <TouchableOpacity
      className="w-full bg-accent py-3 rounded-lg items-center justify-center"
      {...rest}
    >
      <Ptext className="text-white text-lg font-medium">{title}</Ptext>
    </TouchableOpacity>
  );
}
