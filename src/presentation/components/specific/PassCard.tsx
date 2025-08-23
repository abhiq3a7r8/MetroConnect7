import { Train, Wifi } from "lucide-react-native";
import { View } from "react-native";
import Card from "../generic/Card";
import PText from "../generic/PoppinsText";

export default function MetroPassCard({
  title = "Metro Pass",
  balance = 325.5,
  currency = "₹",
  cardId = "**** 5678",
  holder = "ABHIRAT MORE",
  expiry = "12/26",
}) {
  return (
    <Card bg="bg-blue-950 rounded-2xl py-4 px-5 border border-green-800/30">
      {/* Top row */}
      <View className="flex-row justify-between items-center w-full mb-2">
        <View className="flex-row items-center">
          <Train size={24} color="#ffffff" strokeWidth={2} />
          <PText className="text-white font-semibold text-base ml-2">
            {title}
          </PText>
        </View>
        <Wifi size={20} color="#ffffff" strokeWidth={2} />
      </View>

      {/* Balance */}
      <View className="w-full mb-3">
        <PText className="text-gray-300 text-xs font-medium tracking-tight">
          Remaining Balance
        </PText>
        <View className="flex-row items-end">
          <PText className="text-white text-xl font-semibold mr-1.5">
            {currency}
          </PText>
          <PText className="text-white text-3xl font-bold">
            {formatAmount(balance)}
          </PText>
        </View>
      </View>

      {/* Bottom row */}
      <View className="flex-row justify-between items-center w-full">
        <View>
          <PText className="text-gray-400 text-[10px] font-medium tracking-tight uppercase">
            Pass ID
          </PText>
          <PText className="text-white text-sm font-semibold tracking-wide">
            {cardId}
          </PText>
          <PText className="text-gray-400 text-[10px] font-medium tracking-tight uppercase mt-1">
            Holder
          </PText>
          <PText className="text-white text-sm font-semibold tracking-wide">
            {holder}
          </PText>
        </View>
        <View className="items-end">
          <PText className="text-gray-400 text-[10px] font-medium tracking-tight uppercase">
            Valid Till
          </PText>
          <PText className="text-white text-sm font-semibold tracking-wide">
            {expiry}
          </PText>
        </View>
      </View>
    </Card>
  );
}

function formatAmount(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return String(n);
  }
}
