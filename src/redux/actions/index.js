import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY, GET_PRODUCT_BY_NAME, ORDER_BY_PRICE,
ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_TOTAL, LESS_TO_TOTAL, CLEAR_CART, CLEAR_PRODUCTS, GET_CATEGORIES, CLEAR_DETAIL } from "../actionTypes";

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
  return { type: GET_PRODUCT_BY_ID, payload: id }
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

export function updateProduct(data) {
  return { type: UPDATE_PRODUCT, payload: data }
}

export function deleteProduct(id) {
  return { type: DELETE_PRODUCT, payload: id }
}

export function getCategory(payload) {
  return { type: GET_CATEGORY, payload }
}

export function getCategories(payload) {
  return { type: GET_CATEGORIES, payload }
}

export function getProductByName(text) {
  return { type: GET_PRODUCT_BY_NAME, payload: text }
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

export function addToTotal(id) {
  return { type: ADD_TO_TOTAL, payload: id }
}

export function lessToTotal(id) {
  return { type: LESS_TO_TOTAL, payload: id }
}

export function clearCart() {
  return { type: CLEAR_CART }
}

export function clearProducts() {
  return { type: CLEAR_PRODUCTS }
}

export function clearDetail() {
  return { type: CLEAR_DETAIL }
}