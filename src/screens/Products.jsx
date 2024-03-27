import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { View, Text } from "react-native";
import ProductItem from "../components/ProductItem";

export default function Products() {

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
        allProducts.map(el => <ProductItem key={el.id} info={el} />)
      }
    </View>
  )
}