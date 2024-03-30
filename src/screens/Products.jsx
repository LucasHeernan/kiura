import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByName, clearProducts, getAllProducts } from "../redux/actions";
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

  useEffect(() => {
    dispatch(getAllProducts());
  }, [allProducts])

  const onSubmit = (e) => {
    dispatch(getProductByName(e));
    setText("");
  }

  const clear = () => {
    dispatch(clearProducts());
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor:"#fff"
      }}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
            iconColor="#0594A4"
            inputStyle={{ color: "#000000" }}
            style={{
              color: "#161b22",
              backgroundColor: "rgba(71,85,105, 0.1)",
              borderRadius: 13,
              width: 275
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: "#fff",
                padding: 13,
                borderRadius: 13,
                borderWidth: 1,
                borderColor: "#173B48",
                backgroundColor: "#0594A4"
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
                  color: "#000000",
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
                  color: "#0594A4",
                  fontWeight: "400",
                }}
              >
                Clear filters
              </Text>
            </TouchableOpacity>
          </View>

          <View>
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
              fontSize: 25,
              color: "#fff",
              paddingTop: 12,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 12,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "#173B48",
              backgroundColor: "#0594A4"
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
