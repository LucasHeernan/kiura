import SplashScreen from "./src/screens/SplashScreen";
import Products from "./src/screens/Products";
import Detail from "./src/screens/Detail";
import Cart from "./src/screens/Cart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={Products} options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Create" component={Create} /> */}
      {/* <Stack.Screen name="Update" component={Update} /> */}
    </Stack.Navigator>
  )
}