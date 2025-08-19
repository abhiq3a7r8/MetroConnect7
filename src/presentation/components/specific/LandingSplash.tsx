import { Image, View } from "react-native";
import { Images } from "../../../shared/constants/images";
import Ptext from "../generic/PText";


export default function LandingSplash() {
    return(    
        <View className="flex items-center justify-center">
            <Image source={Images.metroLanding} className="h-48 w-48 rounded-2xl"/>
            <Ptext className="text-2xl mt-4">MetroConnect7</Ptext>
        </View>
    )

}