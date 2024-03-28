import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch } from "react-redux";
import { getCategory, orderByPrice } from "../redux/actions";

export default function Filter() {

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const categories = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"];

  const [price, setPrice] = useState("");
  const prices = ["lower price", "higher price"];

  function handlerByCatogory(e) {
    dispatch(getCategory(e));
    alert(e);
  }

  function handlerPerPrice(e) {
    dispatch(orderByPrice(e));
    alert(e)
  }

  return (
    <View style={styles.container}>
      <SelectList
        data={categories}
        setSelected={setCategory}
        onSelect={() => handlerByCatogory(category)}
        placeholder="Category"
        search={false}
        boxStyles={styles.box}
        inputStyles={styles.test}
      />
      <SelectList
        data={prices}
        setSelected={setPrice}
        onSelect={() => handlerPerPrice(price)}
        placeholder="Order By Price"
        search={false}
        boxStyles={styles.box}
        inputStyles={styles.test}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  box: {
    borderColor: "#B9B9B9",
    borderRadius: 14
  },
  test: {
    fontSize: 12,
    color: "#777777",
  }
})