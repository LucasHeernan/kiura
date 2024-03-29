import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByName, clearProducts } from "../redux/actions";
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProductFilter from "../components/ProductFilter";
import ProductItem from "../components/ProductItem";


export default function Products() {

  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { allProducts, category } = useSelector(store => store);
  const navigation = useNavigation();

  const onSubmit = (e) => {
    dispatch(getProductByName(e));
  }

  const clear = () => {
    dispatch(clearProducts());
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white
      }}
    >
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16
          }}
        >
          <Searchbar
            placeholder="Search by name"
            onChangeText={setText}
            value={text}
            onIconPress={() => onSubmit(text)}
            onSubmitEditing={() => onSubmit(text)}
            style={{
              color: COLOURS.black,
              borderRadius: 15,
              width: 275
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLOURS.black,
                padding: 13,
                borderRadius: 13,
                borderWidth: 1,
                borderColor: COLOURS.black,
                backgroundColor: COLOURS.greenDpwer
              }}
            />
          </TouchableOpacity>
        </View>
        
        <ProductFilter />

        <View
          style={{
            padding: 16
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Products
              </Text>
            </View>
            <TouchableOpacity
              onPress={clear}
              style={{
                padding: 6,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#F0F0F3",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#0043F9",
                  fontWeight: "400",
                }}
              >
                Clear filters
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1
            }}
          > 
            {
              category.length > 0 ? category.map(product => {
                return (
                  <ProductItem
                    key={product.id}
                    product={product}
                  />
                )
              }) :
              allProducts.map(product => {
                return (
                  <ProductItem
                    key={product.id}
                    product={product}
                  />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 35,
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <AntDesign
            name="plus"
            style={{
              fontSize: 24,
              color: "#173B48",
              padding: 11,
              borderRadius: 13,
              borderWidth: 1,
              borderColor: "#4CC671",
              backgroundColor: "#0594A4"
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COLOURS = {
  white: "#ffffff",
  black: "#000000",
  green: "#00AC76",
  greenDpwer: "#C7D31E",
  red: "#C04345",
  blue: "#0043F9",
  backgroundLight: "#F0F0F3",
  backgroundMedium: "#B9B9B9",
  backgroundDark: "#777777",
};
