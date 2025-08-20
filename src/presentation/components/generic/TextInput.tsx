import { ReactNode } from "react";
import { TextInput as RNTextInput, TextInputProps, View } from "react-native";
import Ptext from "./PoppinsText";

type TextInputPropsExtended = TextInputProps & {
  label?: string;
  error?: string;
  children?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

export default function TextBox({
  label,
  error,
  children,
  containerClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  ...rest
}: TextInputPropsExtended) {
  const placeholderTextColor = "#9CA3AF"; 

  return (
    <View className={`w-full my-2 ${containerClassName ?? ""}`}>
      {label && (
        <Ptext className={`text-base font-medium mb-1 ${labelClassName ?? ""}`}>
          {label}
        </Ptext>
      )}
      <RNTextInput
        className={`bg-zinc-50 border border-gray-400 rounded-lg px-3 py-2 text-xl text-black h-14 ${inputClassName ?? ""}`}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
      {error && <Ptext className={`text-red-500 mt-1 ${errorClassName ?? ""}`}>{error}</Ptext>}
      {children}
    </View>
  );
}
