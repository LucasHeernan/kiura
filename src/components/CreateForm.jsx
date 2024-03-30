import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/actions";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";


export default function CreateForm() {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { allProducts } = useSelector(store => store);

  const initialProduct = {
    id: +allProducts.length + 550,
    title: "",
    description: "",
    price: 0,
    category: "",
    thumbnail: null
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Invalid title")
      .required("Title is required!"),
    description: Yup.string()
      .max(150, "Description is too large!")
      .min(10, "Description is too short!")
      .required("Description is required!"),
    price: Yup.number()
      .integer()
      .required("Price is required!")
      .positive("Price must be positive!")
      .required("Price is required!"),
    category: Yup.string()
      .trim()
      .min(3, "Too short sport!")
      .max(20, "Invalid sport!")
      .required("Category is required!"),
  });

  const create = async (values, formikActions) => {
    const updatedValues = {...values, category: values.category.toLowerCase() };
    dispatch(createProduct(updatedValues));
    alert("Product create successfully!");
    console.log(values);
    navigation.navigate("Products");

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };
  
  return (
    <View>
      <Formik
        initialValues={initialProduct}
        validationSchema={validationSchema}
        onSubmit={create}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "100%",
                position: "relative",
                marginTop: 30
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: "rgba(71,85,105, 0.1)",
                  paddingHorizontal: 15
                }}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Title"
              />
              <View style={{height: 25, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
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
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: "rgba(71,85,105, 0.1)",
                  paddingHorizontal: 15
                }}
                onChangeText={handleChange("category")}
                onBlur={handleBlur("category")}
                value={values.category}
                placeholder="Category"
              />
              <View style={{height: 25, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
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
                  paddingVertical: 10,
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
              <View style={{height: 25, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
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
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: "rgba(71,85,105, 0.1)",
                  paddingHorizontal: 15
                }}
                numberOfLines={8}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                placeholder="Description"
              />
              <View style={{height: 25, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 15 }}>
                {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
              </View>
            </View>

            <View
              style={{
                width: "70%",
                marginTop: 70
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
                  Create product
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    color: '#d32f2f',
    fontSize: 12
  },
});