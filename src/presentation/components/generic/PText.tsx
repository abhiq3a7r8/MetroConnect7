
import { Text, TextProps } from "react-native";

type Ptextprops = TextProps & {
  weight?: "regular" | "medium" | "bold";
};

export default function Ptext({ weight = "regular", style, ...rest }: Ptextprops) {
  const fontFamily =
    weight === "medium"
      ? "Poppins_500Medium"
      : weight === "bold"
      ? "Poppins_700Bold"
      : "Poppins_400Regular";

  return <Text style={[{ fontFamily }, style]} {...rest} />;
}
