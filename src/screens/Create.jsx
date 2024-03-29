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
              color: "#777777",
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
              fontWeight: "500",
            }}>
            Edit Profile Info
        </Text>
        <View></View>
      </View>

      <CreateForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  button: {
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 70,
    width: "70%",
    backgroundColor: "#C7D31E",
  },
});