import SplashScreen from "./src/screens/SplashScreen";
import Products from "./src/screens/Products";
import Detail from "./src/screens/Detail";
import Cart from "./src/screens/Cart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Cart" component={Cart} />
      {/* <Stack.Screen name="Create" component={Create} /> */}
      {/* <Stack.Screen name="Update" component={Update} /> */}
    </Stack.Navigator>
  )
}