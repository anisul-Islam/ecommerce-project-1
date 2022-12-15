import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../services/ProductService";

const SearchForm = () => {
  const navigate = useNavigate();
  const [serachValue, setSerachValue] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await searchProducts(serachValue);
      // now you can store this value in redux store then navigate to other page
      navigate("/search", { state: response });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        style={{ height: "40px" }}
        onChange={(e) => {
          setSerachValue(e.target.value);
        }}
        value={serachValue}
        autoFocus
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
