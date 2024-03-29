import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID, addToCart } from "../redux/actions";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, Caption, Headline, Tooltip } from "react-native-paper"
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

export default function Detail({ route, navigation }) {

  const { id } = route.params
  const dispatch = useDispatch();
  const { detail, cart } = useSelector(store => store);
  const [product, setProduct] = useState(null);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            style={{
              fontSize: 18,
              color: '#777777',
              padding: 12,
              backgroundColor: '#F0F0F3',
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
                color: '#777777',
                padding: 12,
                backgroundColor: '#F0F0F3',
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
        </Tooltip>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {
          detail.thumbnail === null ? <Image source={require("../../assets/icon.png")} alt={detail.title} style={styles.thumbnail} /> :
          <Image source={{uri: detail.thumbnail}} alt={detail.title} style={styles.thumbnail} />
        }

        <Caption style={{letterSpacing: 2, alignItems: "center", marginBottom:2, marginTop: 20}}>{detail.category}</Caption>
        <Headline style={styles.title}>{detail.title}</Headline>
        <Headline style={styles.price}>$ {detail.price}</Headline>

        <Button icon="cash" mode="contained" style={styles.carting} onPress={handleSubmit}>ADD TO CART</Button>

        <Text style={styles.description}>{detail.description}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    padding: 12,
    backgroundColor: 'white'
  },
  thumbnail: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12
  },
  noStock: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12,
    opacity: 0.6
  },
  title: {
    lineHeight: 20,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 18,
  },
  price: {
    fontWeight: "bold",
    color: "green",
    fontSize: 19
  },
  description: {
    lineHeight: 24,
    fontSize: 16
  },
  carting: {
    backgroundColor: "#C7D31E",
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12
  },
  noCarting: {
    backgroundColor: "#C7D31E",
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12,
    opacity: 0.6
  }
});