import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/actions";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
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
          <View>
            <TextInput
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              placeholder="Title"
            />
            {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
            
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              placeholder="Description"
            />
            {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
            
            <TextInput
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values.price}
              placeholder="Price"
              keyboardType="numeric"
            />
            {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}
            
            <TextInput
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
              placeholder="Category"
            />
            {touched.category && errors.category && <Text style={styles.error}>{errors.category}</Text>}
            
            <Button onPress={handleSubmit} title="Create product" />
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});