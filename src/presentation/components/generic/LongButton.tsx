import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Ptext from "./PoppinsText";

type LongButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean; // new prop
};

export default function LongButton({ title, loading = false, style, ...rest }: LongButtonProps) {
  return (
    <TouchableOpacity
      testID="long-button"
      className="w-full bg-accent py-3 rounded-lg items-center justify-center flex-row"
      disabled={loading} 
      {...rest}
    >
      {loading ? (
        <ActivityIndicator testID="activity-indicator" size="small" color="white" />
      ) : (
        <Ptext className="text-white text-lg font-medium">{title}</Ptext>
      )}
    </TouchableOpacity>
  );
}
