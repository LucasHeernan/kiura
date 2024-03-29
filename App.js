import { Provider } from "react-redux";
import store from "./src/redux";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MyStack from "./Navigation";


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const colors = ["#4CC671", "#0594A4", "#173B48"];
const typographic = "League Spartan";