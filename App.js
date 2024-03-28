import { Provider } from 'react-redux';
import store from "./src/redux";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Navigation';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
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