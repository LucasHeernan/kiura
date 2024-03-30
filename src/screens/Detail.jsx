import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID, addToCart, deleteProduct, removeFromCart, clearProducts } from "../redux/actions";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, Caption, Headline, Tooltip, Portal, Modal } from "react-native-paper"
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

export default function Detail({ route, navigation }) {

  const { id } = route.params
  const dispatch = useDispatch();
  const { detail, cart, allProducts } = useSelector(store => store);
  const [product, setProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const containerStyle = { backgroundColor: "#fff", padding: 15, marginHorizontal: 15 };

  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch])

  useEffect(() => {
    setProduct({
      id: detail.id,
      title: detail.title,
      price: detail.price,
      thumbnail: detail.thumbnail,
      total: 1
    })
  }, [detail])

  const handleSubmit = () => {
    const exists = cart.find(e => e.id === id)
    if (!exists) {
      dispatch(addToCart(product));
      alert("Product added to cart!");
    } else { alert("This product is already in the cart") }
  }

  const deteleProduct = () => {
    const exists = cart.find(e => e.id === id)
    if (exists) {
      dispatch(removeFromCart(id));
      dispatch(deleteProduct(id));
      dispatch(clearProducts());
      alert("Product successfully removed");
      navigation.navigate("Products");
    } else {
      dispatch(deleteProduct(id));
      dispatch(clearProducts());
      alert("Product successfully removed");
      navigation.navigate("Products");
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            style={{
              fontSize: 18,
              color: "#0594A4",
              padding: 12,
              backgroundColor: "#F0F0F3",
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
        <Tooltip
          title="Edit product"
          enterTouchDelay="1000"
        >
          <TouchableOpacity onPress={() => navigation.navigate("Update")}>
            <SimpleLineIcons
              name="pencil"
              style={{
                fontSize: 18,
                color: "#0594A4",
                padding: 12,
                backgroundColor: "#F0F0F3",
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
        </Tooltip>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {
          detail.thumbnail === null ? <Image source={require("../../assets/kiuraLogo.png")} alt={detail.title} style={styles.thumbnail} /> :
          <Image source={{uri: detail.thumbnail}} alt={detail.title} style={styles.thumbnail} />
        }

        <Caption style={{letterSpacing: 2, alignItems: "center", marginBottom:2, marginTop: 20}}>{detail.category}</Caption>
        <Headline style={styles.title}>{detail.title}</Headline>
        <Headline style={styles.price}>$ {detail.price}</Headline>

        <Button icon="cart" mode="elevated" textColor="#fff" style={styles.carting} onPress={handleSubmit}>ADD TO CART</Button>

        <Text style={styles.description}>{detail.description}</Text>

        <Button icon="trash-can-outline" mode="contained" textColor="#fff" style={styles.trash} onPress={() => setVisible(true)}>DELETE PRODUCT</Button>
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
            <Text>¿ Are you sure to permanently remove this product ?</Text>
            <Button icon="trash-can-outline" mode="contained" textColor="#fff" style={styles.delete} onPress={deteleProduct}>DELETE PRODUCT</Button>
          </Modal>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    padding: 12,
    backgroundColor: "#fff"
  },
  thumbnail: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12
  },
  title: {
    lineHeight: 20,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 18,
  },
  price: {
    fontWeight: "bold",
    color: "#173B48",
    fontSize: 19
  },
  description: {
    lineHeight: 24,
    fontSize: 16
  },
  carting: {
    backgroundColor: "#0594A4",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12
  },
  trash: {
    backgroundColor: "#173B48",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12
  },
  delete: {
    backgroundColor: "#d32f2f",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12
  }
});