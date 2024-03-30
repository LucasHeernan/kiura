import { useDispatch, useSelector } from "react-redux";
import { updateProduct, clearDetail } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";


export default function Update() {

  const dispatch = useDispatch();
  const { detail } = useSelector(store => store);
  const navigation = useNavigation();

  const initialProduct = {
    id: detail.id,
    title: detail.title,
    description: detail.description,
    price: detail.price,
    category: detail.category,
    thumbnail: detail.thumbnail
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .required("Title is required"),
    description: Yup.string()
      .max(250, "Description is to large")
      .min(10, "Description is to short")
      .required("Description is required"),
    price: Yup.number()
      .integer()
      .positive("Price must be positive")
      .required("Price is required"),
    category: Yup.string()
      .trim()
      .min(2, "Category to short sport")
      .max(25, "Category to large")
      .required("Category is required"),
  });

  const update = async (values, formikActions) => {
    const updatedValues = {...values, category: values.category.toLowerCase() };
    dispatch(updateProduct(updatedValues));
    dispatch(clearDetail());
    alert("Product modify successfully!");
    console.log("VALUES ", values);
    console.log("UPDATED VALUES ", updatedValues);
    navigation.navigate("Products");

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            style={{
              fontSize: 18,
              color: "#0594A4",
              padding: 12,
              backgroundColor: "#F0F0F3",
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "500"
          }}>
          Modify product
        </Text>
        <View style={{ width: 25 }} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {
          detail.thumbnail === null ? <Image source={require("../../assets/kiuraLogo.png")} alt={detail.title} style={styles.thumbnail} /> :
          <Image source={{uri: detail.thumbnail}} alt={detail.title} style={styles.thumbnail} />
        }
        <Formik
          initialValues={initialProduct}
          validationSchema={validationSchema}
          onSubmit={update}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white"
              }}
            >
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginTop: 10
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: "rgba(71,85,105, 0.1)",
                    paddingHorizontal: 15
                  }}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                <View style={{height: 20, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
                  {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  position: "relative"
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: "rgba(71,85,105, 0.1)",
                    paddingHorizontal: 15
                  }}
                  onChangeText={handleChange("category")}
                  onBlur={handleBlur("category")}
                  value={values.category}
                />
                <View style={{height: 20, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
                  {touched.category && errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
                </View>
              </View>
              
              <View
                style={{
                  width: "100%",
                  position: "relative"
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: "rgba(71,85,105, 0.1)",
                    paddingHorizontal: 15
                  }}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  value={values.price}
                  placeholder="Price"
                  keyboardType="numeric"
                />
                <View style={{height: 20, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
                  {touched.price && errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  position: "relative"
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    textAlignVertical: "top",
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: "rgba(71,85,105, 0.1)",
                    paddingHorizontal: 15
                  }}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
                <View style={{height: 20, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
                  {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                </View>
              </View>

              <View
                style={{
                  width: "70%",
                  marginTop: 10
                }}
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    width: "100%",
                    backgroundColor: "#0594A4",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      letterSpacing: 1,
                      color: "white",
                      textTransform: "uppercase",
                    }}
                  >
                    Modify product
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20
  },
  thumbnail: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12
  }
});