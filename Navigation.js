import Welcome from "./src/screens/Welcome";
import Products from "./src/screens/Products";
import Detail from "./src/screens/Detail";
import Cart from "./src/screens/Cart";
import Create from "./src/screens/Create";
import Update from "./src/screens/Update";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={Products} options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="Create" component={Create} options={{ headerShown: false }} />
      <Stack.Screen name="Update" component={Update} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}