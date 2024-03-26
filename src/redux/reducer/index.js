import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, POST_PRODUCT, UPDATE_PRODUCT } from "../actionTypes";

const initialState = {
  products: [],
  cart: [],
  detail: [],
  categories: []
};

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        detail: action.payload
      }
    default: return { ...state }
  }
}

export default reducer;