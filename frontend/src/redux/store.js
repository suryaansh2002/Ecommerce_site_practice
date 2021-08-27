import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import { getProductsReducer,getProductDetailsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts:getProductsReducer,
  getProductDetails:getProductDetailsReducer
});

const middleware = [thunk];

const cartLocal=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]

const INITIAL={
  cart:{
    cartItems:cartLocal
  }
}
const store = createStore(
  reducer,
INITIAL,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
