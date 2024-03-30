import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
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
    async function prepareApp() {
      if (fontsLoaded && allProducts.length > 0) {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
        navigation.navigate("Products");
      }
    }

    prepareApp();
  }, [fontsLoaded, allProducts]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (!fontsLoaded || fontError || !appIsReady) {
    return null;
  }

  if (!fontsLoaded && !fontError) return null;
  if (!appIsReady) return null;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        alt="kiura"
        source={require("../../assets/kiuraLogo.png")}
        style={{
          width: "50%",
          height: 300,
          resizeMode: "contain"
        }}
      />
    </View>
  );
}
