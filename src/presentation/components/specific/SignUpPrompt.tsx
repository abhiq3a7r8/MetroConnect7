import { TouchableOpacity, View } from "react-native";
import Ptext from "../generic/PText";

type SignUpPromptProps = {
  isSignUp: boolean;
  toggleForm: () => void;
};

export default function SignUpPrompt({ isSignUp, toggleForm }: SignUpPromptProps) {
  return (
    <View className="flex-row justify-center">
      <Ptext className="text-gray-700">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
      </Ptext>
      <TouchableOpacity onPress={toggleForm}>
        <Ptext className="text-blue-600 font-medium">
          {isSignUp ? "Log in" : "Sign up"}
        </Ptext>
      </TouchableOpacity>
    </View>
  );
}
