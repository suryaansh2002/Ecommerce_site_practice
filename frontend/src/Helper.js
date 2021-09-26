import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as listProducts } from "./redux/actions/productActions";

export function Helper() {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  let { products, loading, error } = getProducts;
  return getProducts;
}
