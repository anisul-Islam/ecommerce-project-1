import React from "react";

const Badge = ({ quantity, sold }) => {
  return (
    <div>
      <span className="badge1">
        {quantity > 0 ? `${quantity - sold} in stock` : "Out of stock"}
      </span>
      <span className="badge2">{sold} Sold</span>
    </div>
  );
};

export default Badge;
