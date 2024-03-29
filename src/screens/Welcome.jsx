import { useCallback, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Welcome() {

  const dispatch = useDispatch();
  const { allProducts } = useSelector(store => store);
  const navigation = useNavigation();

  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({ "LeagueSpartan": require("../../assets/fonts/LeagueSpartan.ttf") });
  
  useEffect(() => {
    dispatch(getAllProducts());
    allProducts.length > 0 && fontsLoaded ? setAppIsReady(true) : null;
  }, [allProducts, fontsLoaded]);


  const onLayoutRootView = useCallback(async () => {
    if ( appIsReady ) {
      navigation.navigate("Products");
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!fontsLoaded && !fontError) return null;
  if (!appIsReady) return null;

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <Image
        alt="kiura"
        source={require("../../assets/kiuraSplash.png")}
        style={{
          width: "50%",
          height: 300,
          resizeMode: "contain"
        }}
      />
      {/* <Text style={{ fontFamily: "LeagueSpartan", fontSize: 25 }}>SplashScreen LeagueSpartan 👋</Text>
      <Entypo name="rocket" size={30} />
      <Text style={{ fontSize: 25 }}>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} /> */}
    </View>
  );
}
