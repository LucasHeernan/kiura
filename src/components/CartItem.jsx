import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeFromCart, addToTotal, lessToTotal } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";

export default function CartItem({ data }) {

    const { id, title, price, thumbnail } = data;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [change, setChange] = useState(1);
    
    const handleMinus = () => {
      change > 1 ? (setChange(change - 1), dispatch(lessToTotal(id))) : null;
    }
    
    const handlePlus = () => {
      change < 3 ? (setChange(change + 1), dispatch(addToTotal(id))) : alert("NO MORE STOCK");
    }

    const handleDelete = (id) => {
      dispatch(removeFromCart(id));
      alert("REMOVED PRODUCT");
    }

    return (
      <View
        key={id}
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 20
        }}
      >
        <TouchableOpacity
          onPress={() => { navigation.navigate("Detail", { id: id }) }}
          style={{
            width: "30%",
            height: 100,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          {
            thumbnail === null ?
              <Image
                source={require("../../assets/kiuraLogo.png")}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              /> :
              <Image
                source={{uri: thumbnail}}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
          }
          <Image
            source={{uri: thumbnail}}
            
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <TouchableOpacity
              onPress={() => { navigation.navigate("Detail", { id: id }) }}
            >
              <Text
                style={{
                  fontSize: 14,
                  maxWidth: "100%",
                  color: "#000000",
                  fontWeight: "600",
                  letterSpacing: 1,
                }}
              >
                {title}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
                justifyContent: "space-between"
              }}
            >
              
              {/* --- MINUS && PLUS --- */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={handleMinus}
                  style={{
                    borderRadius: 100,
                    marginRight: 10,
                    padding: 5
                  }}
                >
                  <Feather
                    name="minus-circle"
                    style={{
                      fontSize: 22,
                      color: "#4CC671",
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: "600" }}> {change} </Text>
                <TouchableOpacity
                  onPress={handlePlus}
                  style={{
                    borderRadius: 100,
                    marginLeft: 10,
                    padding: 5
                  }}
                >
                  <Feather
                    name="plus-circle"
                    style={{
                      fontSize: 22,
                      color: "#4CC671",
                    }}
                  />
                </TouchableOpacity>
              </View>
              
              {/* --- PRICE --- */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  maxWidth: "85%",
                  marginRight: 4,
                  color: "black"
                }}
              >
                $ {change * price}
              </Text>

              {/* --- DELETE --- */}
              <TouchableOpacity
                onPress={() => handleDelete(id)}
              >
                <Feather
                  name="x-circle"
                  style={{
                    fontSize: 22,
                    color: "#d32f2f",
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };