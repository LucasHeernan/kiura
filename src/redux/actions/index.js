import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY, GET_PRODUCT_BY_NAME, ORDER_BY_PRICE,
ADD_TO_CART, REMOVE_FROM_CART, CLEAN_CART } from "../actionTypes";

export function getAllProducts() {
  return async (dispatch) => {
    try {
      const data = await axios("https://dummyjson.com/products").then(e => e.data);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data.products
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function getProductByID(id) {
  return async (dispatch) => {
    try {
      const data = await axios(`https://dummyjson.com/products/${id}`).then(e => e.data);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function createProduct(item) {
  return async (dispatch) => {
    try {
      const data = await axios.post("https://dummyjson.com/products/add", item).then(e => e.data);
      return dispatch({
        type: CREATE_PRODUCT,
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function updateProduct(id, info) {
  return async (dispatch) => {
    try {
      const data = await axios.put(`https://dummyjson.com/products/${id}`, info).then(e => e.data);
      return dispatch({
        type: UPDATE_PRODUCT,
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      const data = await axios.delete(`https://dummyjson.com/products/${id}`).then(e => e.data);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function getCategory(category) {
  return async (dispatch) => {
    try {
      const data = await axios(`https://dummyjson.com/products/category/${category}`).then(e => e.data);
      return dispatch({
        type: GET_CATEGORY,
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function getProductByName(payload) {
  return { type: GET_PRODUCT_BY_NAME, payload }
}

export function orderByPrice(payload) {
  return { type: ORDER_BY_PRICE, payload }
}

export function addToCart(product) {
  return { type: ADD_TO_CART, payload: product }
}

export function removeFromCart(id) {
  return { type: REMOVE_FROM_CART, payload: id }
}

export function cleanCart() {
  return { type: CLEAN_CART }
}