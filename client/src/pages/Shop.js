import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "../components/Checkbox";
import ProductList from "../components/ProductList";
import RadioButton from "../components/RadioButton";
import { prices } from "../price";
import { getCategories } from "../services/CategoryService";
import { getFilteredProducts, getProducts } from "../services/ProductService";

export const Shop = () => {
  const adminData = useSelector((state) => state.user.data);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);

  const handleSelectedCategory = (categoryName) => {
    if (checkedCategories.includes(categoryName)) {
      const filteredItems = checkedCategories.filter((c) => c !== categoryName);
      setCheckedCategories(filteredItems);
    } else {
      setCheckedCategories((prevState) => [...prevState, categoryName]);
    }
  };

  const handleSelectedPrice = (price) => {
    console.log(price);
    setCheckedPrice(price);
  };

  const fetchCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(categories);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const fetchFilteredProducts = async () => {
    try {
      const response = await getFilteredProducts(
        checkedCategories,
        checkedPrice
      );
      setProducts(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // by default fetch all the products
  useEffect(() => {
    if (!checkedCategories.length || !checkedPrice.length) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (checkedCategories.length || checkedPrice.length) {
      fetchFilteredProducts();
    }
  }, [checkedCategories, checkedPrice]);

  return (
    <>
      {adminData ? (
        <div className="container-full">
          <div className="sidebar">
            <h3>Filter By categories</h3>
            <div>
              {categories &&
                categories.map((category) => (
                  <Checkbox
                    key={category._id}
                    category={category}
                    onHandleSelectedCategory={handleSelectedCategory}
                  />
                ))}
            </div>
            <br />
            <br />
            <h3>Filter By Prices</h3>
            <div>
              {prices &&
                prices.map((price) => (
                  <RadioButton
                    key={price._id}
                    price={price}
                    onHandleSelectedPrice={handleSelectedPrice}
                  />
                ))}
            </div>

            <div>
              <button
                className="btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="main-content">
            <div className="products">
              <pre>{JSON.stringify({ checkedPrice, checkedCategories })}</pre>
              <h2>Total Products: {products.length}</h2>
              <div>
                <ProductList products={products} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
