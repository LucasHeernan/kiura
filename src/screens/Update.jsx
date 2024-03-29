import { useDispatch, useSelector } from "react-redux";
import { updateProduct, clearDetail } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-paper"
import { Ionicons } from '@expo/vector-icons';
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
    console.log(values);
    navigation.navigate("Products");

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            style={{
              fontSize: 18,
              color: '#777777',
              padding: 12,
              backgroundColor: '#F0F0F3',
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {
          detail.thumbnail === null ? <Image source={require("../../assets/icon.png")} alt={detail.title} style={styles.thumbnail} /> :
          <Image source={{uri: detail.thumbnail}} alt={detail.title} style={styles.thumbnail} />
        }
        <Formik
          initialValues={initialProduct}
          validationSchema={validationSchema}
          onSubmit={update}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                label="Category"
                mode="outlined"
                value={values.category}
                onChangeText={handleChange("category")}
                onBlur={handleBlur("category")}
                error={touched.category && errors.category}
              />
              <View style={styles.carting} />
              <TextInput
                label="Title"
                mode="outlined"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                error={touched.title && errors.title}
              />
              <View style={styles.carting} />
              <TextInput
                label="Price"
                mode="outlined"
                value={values.price}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                error={touched.price && errors.price}
              />
              <View style={styles.carting} />
              <TextInput
                label="Description"
                mode="outlined"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                error={touched.description && errors.description}
              />

              <Button onPress={handleSubmit} title="Modify product" />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    padding: 12,
    backgroundColor: 'white'
  },
  thumbnail: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12
  },
  noStock: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12,
    opacity: 0.6
  },
  title: {
    lineHeight: 20,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 18,
  },
  price: {
    fontWeight: "bold",
    color: "green",
    fontSize: 19
  },
  description: {
    lineHeight: 24,
    fontSize: 16
  },
  carting: {
    backgroundColor: "#C7D31E",
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12
  },
  noCarting: {
    backgroundColor: "#C7D31E",
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12,
    opacity: 0.6
  }
});