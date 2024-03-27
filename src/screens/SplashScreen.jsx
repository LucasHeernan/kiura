import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { View, Text, Button, TouchableOpacity } from "react-native";
import ProductItem from "../components/ProductItem";

export default function SplashScreen({ navigation }) {

  const dispatch = useDispatch();
  const { allProducts } = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])
  
  return (
    <View>
      {
        allProducts.length < 1 ?
        <Text>TODAVIA NADA ...</Text> :
        allProducts.map((el, index) => {
          return (
            // <View key={index}>
            //   <Text>{el.id}</Text>
            //   <Text>{el.title}</Text>
            //   <Button
            //     title="ver más"
            //     onPress={() => navigation.navigate('Detail', { id: el.id })}
            //   />
            // </View>
            <ProductItem key={el.id} info={el} />
          )
        })
      }
    </View>
  )
}