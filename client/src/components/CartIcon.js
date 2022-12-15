import React from "react";

const CartIcon = ({ value }) => {
  return (
    <div className="cart-icon">
      <i className="fa fa-2x fa-shopping-cart"></i>
      <span className="badge">{value}</span>
    </div>
  );
};

export default CartIcon;
