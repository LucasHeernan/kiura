import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Headline } from "react-native-paper";

export default function ProductItem({ product }) {

  const navigation = useNavigation();
  const { id, title, thumbnail, price } = product;

  return (
    <View style={styles.view}>
      <Pressable
        key={id} style={styles.product}
        onPress={() => {
          navigation.navigate("Detail", { id: id })
        }}
      >
        {
          thumbnail === null ? <Image source={require("../../assets/kiuraLogo.png")} alt={title} style={styles.thumbnail} /> :
          <Image source={{uri: thumbnail}} alt={title} style={styles.thumbnail} />
        }
        <View style={styles.price}>
          <Headline style={{fontWeight: "bold", color: "#173B48"}}>
            $ {price}
          </Headline>
          <Text style={{marginTop: 10, color: "#0594A4"}} numberOfLines={3}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  thumbnail: {
    width: "85%", 
    height: 220, 
    resizeMode: "contain",
    alignSelf: "center"
  },
  view: {
    marginLeft: 25,
    justifyContent:"center", 
    paddingLeft: 6, 
    paddingRight: 6
  },
  product: {
    width: "65%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 12,
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 6,
    }, 
    shadowOpacity: 0.37, 
    shadowRadius: 7.49, 
    elevation: 12, 
    paddingTop: 3, 
    marginTop: 30, 
    marginBottom: 30, 
    paddingBottom: 20,
    overflow: "hidden"
  },
  price: {
    paddingLeft: 40, 
    paddingRight: 40, 
    paddingTop: 10
  }
});