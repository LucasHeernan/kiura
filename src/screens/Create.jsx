import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreateForm from "../components/CreateForm";

export default function Create({ navigation }) {

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingVertical: 10,
          marginTop: 15,
          marginBottom: 30,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            style={{
              fontSize: 18,
              color: "#0594A4",
              padding: 12,
              backgroundColor: "white",
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "500"
          }}>
          Create product
        </Text>
        <View style={{ width: 25 }} />
      </View>

      <View
        style={{
          width: "100%",
          height: "100%",
          marginVertical: "auto"
        }}
      >
        <CreateForm />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: "relative",
    height: "100%"
  }
});