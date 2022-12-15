import React from "react";

const RadioButton = ({ price, onHandleSelectedPrice }) => {
  const handleChange = (price) => {
    onHandleSelectedPrice(price);
  };

  return (
    <div>
      <input
        type="radio"
        name="price"
        value={price.range}
        onChange={() => {
          handleChange(price.range);
        }}
      />
      <label htmlFor="price">{price.name}</label>
    </div>
  );
};

export default RadioButton;
