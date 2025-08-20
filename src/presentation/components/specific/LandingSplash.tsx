import { Image, View } from "react-native";
import { Images } from "../../../shared/constants/images";
import Ptext from "../generic/PoppinsText";


export default function LandingSplash() {
    return(    
        <View className="items-center" >
            <Image source={Images.metroLanding} className="h-48 w-48 rounded-2xl"/>
            <Ptext className="text-3xl mt-4" weight="medium">MetroConnect7</Ptext>
        </View>
    )

}