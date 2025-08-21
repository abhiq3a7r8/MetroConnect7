import { Image, Text, View } from "react-native";
import { Images } from "../../shared/constants/images";
import LongButton from "../components/generic/LongButton";

interface ErrorScreenProps {
  message: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function ErrorScreen({
  message,
  buttonTitle,
  onPress,
}: ErrorScreenProps) {
  return (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <Image
        source={Images.warning}
        className="h-24 w-24 opacity-80 rounded-2xl mb-10"
      />
      <Text className="text-center text-base mb-4 text-gray-800">
        {message}
      </Text>
      <LongButton onPress={onPress} title={buttonTitle} />
    </View>
  );
}
