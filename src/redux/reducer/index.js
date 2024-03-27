import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY, GET_PRODUCT_BY_NAME, ORDER_BY_PRICE,
ADD_TO_CART, REMOVE_FROM_CART, CLEAN_CART } from "../actionTypes";

const initialState = {
  allProducts: [],
  category: [],
  detail: [],
  cart: []
};

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        detail: action.payload
      }
    case CREATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload]
      }
    case UPDATE_PRODUCT:
      const productIndex = state.allProducts.findIndex(e => e.id === action.payload.id);
      if (productIndex === -1) return state;
      const updatedProducts = [...state.allProducts];
      updatedProducts[productIndex] = action.payload;
      return {
        ...state,
        allProducts: updatedProducts
      }
    case DELETE_PRODUCT:
      const productDelete = state.allProducts.filter(e => e.id !== action.payload);
      return {
        ...state,
        allProducts: productDelete
      }
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    case GET_PRODUCT_BY_NAME:
      const productByName = state.allProducts.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()))
      return {
        ...state,
        allProducts: productByName
      }
    case ORDER_BY_PRICE:
      let allPrices = [...state.allProducts]
      allPrices = allPrices.sort((a, b) => {
        if (action.payload === 'higher price') return b.price - a.price;
        if (action.payload === 'lower price') return a.price - b.price;
        return 0
      })
      let categoryPrices = [...state.category]
      categoryPrices = categoryPrices.sort((a, b) => {
        if (action.payload === 'higher price') return b.price - a.price;
        if (action.payload === 'lower price') return a.price - b.price;
        return 0
      })
      return {
        ...state,
        allProducts: state.category.length ? categoryPrices : allPrices
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case REMOVE_FROM_CART:
      const productOut = state.cart.filter(e => e.id !== action.payload);
      return {
        ...state,
        cart: productOut
      }
    case CLEAN_CART:
      return {
        ...state,
        cart: []
      }
    default: return { ...state }
  }
}

export default reducer;