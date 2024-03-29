import React from "react";
import Product from "../components/Product";
import "./HomeScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as listProducts } from "../redux/actions/productActions";

import { Helper } from "../Helper";
export function HomeScreen() {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const Productdeets = Helper();
  let { products, loading, error } = Productdeets;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  console.log(products);
  return (
    <div className="homescreen">
      <h2 className="homescreen__title">All Products</h2>
      <div className="homescreen__products">
        {loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          (console.log(products),
          products.map((product) => (
            <Product
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          )))
        )}
      </div>
    </div>
  );
}
