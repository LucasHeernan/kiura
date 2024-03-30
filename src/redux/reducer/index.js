import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY, GET_PRODUCT_BY_NAME, ORDER_BY_PRICE,
ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_TOTAL, LESS_TO_TOTAL, CLEAR_CART, CLEAR_PRODUCTS, GET_CATEGORIES, CLEAR_DETAIL } from "../actionTypes";

const initialState = {
  allProducts: [],
  categories: [],
  category: [],
  detail: [],
  search: "",
  cart: []
};

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: state.allProducts.length > 0 ? state.allProducts : action.payload
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        detail: state.allProducts.find(e => e.id === action.payload)
      }
    case CREATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload]
      }
    case UPDATE_PRODUCT:
      const updatedProduct = state.allProducts.map(product => product.id === action.payload.id ? action.payload : product)
      return {
        ...state,
        allProducts: updatedProduct
      }
    case DELETE_PRODUCT:
      const productDelete = state.allProducts.filter(e => e.id !== action.payload);
      return {
        ...state,
        allProducts: productDelete
      }
    case GET_CATEGORY:
      const all = [...state.allProducts]
      const filterCategory = all.filter(e => e.category === action.payload)
      return {
        ...state,
        category: filterCategory
      }
    case GET_CATEGORIES:
      const allCategories = state.allProducts.map(e => e.category).reduce((acc, current) => {
        if (!acc.includes(current)) {
          acc.push(current)
        }
        return acc;
      }, [])
      return {
        ...state,
        categories: allCategories
      }
    case GET_PRODUCT_BY_NAME:
      const searchText = action.payload.toLowerCase();
      const productByName = state.allProducts.filter(e => e.title.toLowerCase().includes(searchText));
      if (productByName.length === 0) alert("No products found matching your search.");
      return {
        ...state,
        category: productByName.length > 0 ? productByName : [],
        search: searchText
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
        category: state.category.length ? categoryPrices : allPrices
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
    case ADD_TO_TOTAL:
      return {
        ...state,
        cart: [...state.cart, state.cart.find(e => e.id === action.payload).total += 1]
      }
    case LESS_TO_TOTAL:
      return {
        ...state,
        cart: [...state.cart, state.cart.find(e => e.id === action.payload).total -= 1]
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }
    case CLEAR_PRODUCTS:
      return {
        ...state,
        category: []
      }
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: []
      }
    default: return { ...state }
  }
}

export default reducer;