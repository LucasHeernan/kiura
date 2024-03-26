import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, POST_PRODUCT, UPDATE_PRODUCT } from "../actionTypes";

export function getAllProducts() {
  return async (dispatch) => {
    try {
      const data = await axios("https://dummyjson.com/products").then(e => e.data);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data
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