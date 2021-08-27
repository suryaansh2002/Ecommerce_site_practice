import "./CartScreen.css";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import CartItem from "../components/CartItem";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";


const CartScreen = () => {


  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

const product={
  name:"Order",
  amount:getCartSubTotal()

}
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:5000/checkout",
      { token, product }
    );
    console.log("Response:", response.data);
  }



  
  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="back">
               Cart Is Empty
            </div>
          ) : (

            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
          <div className="back">
          <Link to="/" className="back">Go Back to Home</Link>

          </div>
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
          <StripeCheckout stripeKey="pk_test_51JT68iSGejj8oVuAOqqtB1iPoj7Mt3DACEPUnQJyq4Hq384qkCHxgUJM1gtDOIZhYl4qX7B3kSDIyxZ5xc2kss1s007nSs9RYX"
        token={handleToken}
        amount={product.amount * 100}
        name="Order"
        billingAddress
        shippingAddress

        />

        
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
