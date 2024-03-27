import { Provider } from 'react-redux';
import store from "./src/redux";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Detail from './src/screens/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                />
              ),
            }}
          />
          <Stack.Screen name="Detail" component={Detail} />
          {/* <StatusBar style="auto" /> */}
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