import React from "react";

const Checkbox = ({ category, onHandleSelectedCategory }) => {
  const handleChange = (e) => {
    onHandleSelectedCategory(e.target.value);
  };

  return (
    <div>
      <input
        type="checkbox"
        name="category"
        value={category._id}
        onChange={handleChange}
      />
      <label htmlFor="category">{category.name}</label>
    </div>
  );
};

export default Checkbox;
