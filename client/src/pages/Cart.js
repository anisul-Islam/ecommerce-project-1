import React from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCartItem } from "../features/cartSlice";
import CheckoutInfo from "../components/cart/CheckoutInfo";

export const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // alert(JSON.stringify(cartData));
  const { userData, token } = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="cart">
      <div className="cart-title center">
        {token ? (
          <h2>
            Hello {userData.name}, You have{" "}
            {cartItems.length > 1 ? cartItems.length : 0} items in the cart
          </h2>
        ) : (
          <h2>
            Please login first to checkout your{" "}
            {cartItems && cartItems.length > 1 ? cartItems.length : 0}
          </h2>
        )}
        <button
          className="btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Continue Shopping
        </button>
      </div>
      <div className="cart-main">
        <div className="cart-items">
          {cartItems &&
            cartItems.length >= 1 &&
            cartItems.map((cartItem) => {
              return (
                <div key={cartItem._id} className="cart-card">
                  <div className="cart-left">
                    <img
                      className="cart-img"
                      src={`http://localhost:8000/api/products/photo/${cartItem._id}`}
                      alt={cartItem.name}
                    />
                  </div>
                  <div className="cart-right">
                    <h3>{cartItem.name}</h3>
                    <h4>
                      Price:
                      {cartItem.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h4>
                    <p>
                      Description: {cartItem.description.substring(0, 50)}...
                    </p>

                    <p>
                      Created At:
                      {moment(cartItem.createdAt).fromNow()}
                    </p>
                    <div>
                      <button
                        className="cart__btn"
                        onClick={() => {
                          removeFromCart(cartItem._id);
                        }}
                      >
                        <i className="fa fa-trash fa-2x"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && token ? (
          <CheckoutInfo />
        ) : (
          <p style={{ color: "red" }}>
            Please login first to see the cart summary
          </p>
        )}
      </div>
    </div>
  );
};
