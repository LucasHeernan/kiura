import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, orderByPrice, getCategories } from "../redux/actions";

export default function Filter() {

  const dispatch = useDispatch();
  const { allProducts, categories } = useSelector(store => store);
  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");
  const prices = ["lower price", "higher price"];

  const handlerByCatogory = (e) => {
    dispatch(getCategory(e));
    alert(e);
  }

  const handlerPerPrice = (e) => {
    dispatch(orderByPrice(e));
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [allProducts])

  return (
    <View style={styles.container}>
      <SelectList
        data={categories}
        setSelected={setCategory}
        onSelect={() => handlerByCatogory(category)}
        placeholder="Categories"
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
    backgroundColor: "white",
    paddingHorizontal: 16
  },
  box: {
    borderColor: "#B9B9B9",
    borderRadius: 14
  },
  test: {
    fontSize: 12,
    color: "#777777"
  }
})