import { Provider } from 'react-redux';
import store from "./src/redux";
import { StatusBar } from 'expo-status-bar';
import Products from './src/screens/Products';
import Detail from './src/screens/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// CATEGORIES
// [
//   "smartphones",
//   "laptops",
//   "furniture",
//   "mens-watches",
//   "womens-watches",
//   "sunglasses"
// ]