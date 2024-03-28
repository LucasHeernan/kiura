import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";


export default function SplashScreen() {

  const dispatch = useDispatch();
  const { allProducts } = useSelector(store => store);
  const navigation = useNavigation();
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  return (
    <View style={{flex:1}} >

      <View style={{width:"100%", height: "100%", justifyContent: "space-around", backgroundColor: "black"}}>

        <View style={{flexDirection:"column", alignItems:"center"}} >
          <Text style={{color: "#FFF", fontSize:30, fontWeight: "bold"}} >Welcome to KIURA</Text>
          <Text style={{maxWidth:"50%", color:"#E6E6E6", fontSize:14, textAlign:"center", paddingTop:15}}>The application to manage your products</Text>
        </View>

        <View style={{flexDirection:"column", alignItems:"center"}} >
          {
            allProducts.length > 1 ?
            <TouchableOpacity style={{justifyContent:"center", width:"90%", backgroundColor: "#6E6E6E", height:50, borderRadius:13 }}
              onPress={() => { navigation.navigate("Products") }}
              >
              <Text style={{fontSize:18, letterSpacing:1.5, textAlign:"center", position:"relative", color: "white"}} >Get Started</Text>
            </TouchableOpacity> : null
          }
        </View>

      </View>

    </View>
  );
}
