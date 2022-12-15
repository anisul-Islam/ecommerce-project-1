import React from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";

export const Search = () => {
  const location = useLocation();
  const searchProducts = location.state;
  return (
    <div>
      {searchProducts ? (
        <ProductList products={searchProducts} />
      ) : (
        "No products found"
      )}
    </div>
  );
};
