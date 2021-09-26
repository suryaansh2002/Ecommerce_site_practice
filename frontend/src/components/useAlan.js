import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";
import { Helper } from "../Helper";
import { useDispatch, useSelector } from "react-redux";

import alanBtn from "@alan-ai/alan-sdk-web";

const COMMANDS = {
  OPEN_CART: "open-cart",
  OPEN_HOME: "open-home",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  PURCHASE_ITEMS: "purchase-items",
};

export default function useAlan() {
  let history = useHistory();
  console.log("History is: " + history);
  const Productdeets = Helper();
  const dispatch = useDispatch();

  const { products, loading, error } = Productdeets;
  console.log(products);

  const [alanInstance, setAlanInstance] = useState();

  const openCart = useCallback(() => {
    alanInstance.playText("Opening cart");
    history.push("/cart");
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);
  }, [alanInstance, history]);
  const openHome = useCallback(() => {
    alanInstance.playText("Going To Home Page");
    history.push("/");
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);
  }, [alanInstance, history]);

  console.log(products);

  const addItem = useCallback(
    ({ detail: { name, quantity } }) => {
      alanInstance.playText(`Adding ${quantity} ${name} to cart`);
      console.log(products);
      console.log(name);
      const item = products.filter(
        (product) => product.name.toLowerCase() == name.toLowerCase()
      );
      console.log(name.toLowerCase());
      console.log(item);
      dispatch(addToCart(item._id, quantity));
      /* history.push("/cart");
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);*/
    },
    [alanInstance, history]
  );

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.OPEN_HOME, openHome);
    window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    //  window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem)
    //  window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems)

    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.OPEN_HOME, openHome);
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
      // window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem)
      // window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems)
    };
  }, [
    alanInstance,
    openCart /*, closeCart, addItem, removeItem, purchaseItems*/,
  ]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        top: "110px",
        right: "15px",
        key: "5e9753cd852d0b94a4b3f412367481472e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, [alanInstance]);
  return null;
}
