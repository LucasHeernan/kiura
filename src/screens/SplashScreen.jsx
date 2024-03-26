import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { View, Text } from "react-native";

export default function SplashScreen() {

  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])

  return (
    <View>
      {
        products.map((el, index) => {
          <View key={index}>
            <Text>{el.id}</Text>
            <Text>{el.title}</Text>
            <Text>{el.description}</Text>
            <Text>{el.price}</Text>
          </View>
        })
      }
    </View>
  )
}