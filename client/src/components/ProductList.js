import React from "react";
import moment from "moment";
import Badge from "./Badge";
import { useDispatch } from "react-redux";
import { setCart } from "../features/cartSlice";
import { toast } from "react-toastify";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  const handleCart = (product) => {
    dispatch(setCart(product));
    toast.success("item is added to the cart successfully");
  };

  return (
    <div className="products__card">
      {products &&
        products.map((product) => {
          return (
            <div key={product._id} className="product">
              <Badge quantity={product.quantity} sold={product.sold} />
              <img
                className="product-img"
                src={`http://localhost:8000/api/products/photo/${product._id}`}
                alt={product.name}
              />
              <h3>Name: {product.name}</h3>
              <h4>
                Price:
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h4>
              <p>Description: {product.description.substring(0, 50)}...</p>

              <div>
                <button className="btn">View Product</button>
                <button
                  className="btn"
                  onClick={() => {
                    handleCart(product);
                  }}
                >
                  Add To Cart
                </button>
              </div>

              <p>Sold: {product.sold}</p>
              <p>
                Created At:
                {moment(product.createdAt).fromNow()}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
