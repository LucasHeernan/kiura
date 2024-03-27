import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../redux/actions";
import { View, Text, Button } from "react-native";

export default function Detail({ route, navigation }) {

  const { id } = route.params
  const dispatch = useDispatch();
  const { detail } = useSelector(store => store);

  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch])

  return (
    <View>
      {
        Object.keys(detail) < 1 ?
        <Text>TODAVIA NADA ...</Text> :
        <View>
          <Text>ID: {detail.id}</Text>
          <Text>TITLE: {detail.title}</Text>
          <Text>DESCRIPTION: {detail.description}</Text>
          <Text>PRICE: {detail.price}</Text>
        </View>
      }
      <Button title="Go to SplashScreen" onPress={() => navigation.navigate('SplashScreen')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}