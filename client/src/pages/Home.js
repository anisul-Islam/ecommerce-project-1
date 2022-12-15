import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts, getTotalProducts } from "../services/ProductService";

import { useFetchStoreData } from "../hooks/useFetchStoreData";
import ProductList from "../components/ProductList";

export const Home = () => {
  const { userData: adminData } = useFetchStoreData();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [countProducts, setCountProducts] = useState(0);

  // pagination
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(page);
      setProducts(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // pagination
  const loadMore = async () => {
    try {
      setIsLoadingMore(true);
      const response = await getProducts(page);

      setProducts((prevState) => {
        return [...prevState, ...response];
      });
      setIsLoadingMore(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    countTotalProducts();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const countTotalProducts = async () => {
    try {
      const response = await getTotalProducts();
      setCountProducts(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleSortSelect = (e) => {
    setSortBy(e.target.value);
  };

  const arr = [...products];
  const sortedBySold = arr.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <>
      <div className="container-full">
        <div className="main-content">
          <label htmlFor="sort">Sort By</label>
          <select name="sort" value={sortBy} onChange={handleSortSelect}>
            <option value="date">new arrival</option>
            <option value="sold">sold</option>
          </select>

          <div className="products">
            <div>
              {products && sortBy === "date" && (
                <ProductList products={products} />
              )}
              {products && sortBy === "sold" && (
                <ProductList products={sortedBySold} />
              )}
            </div>

            {/* pagination is added  */}
            <div className="center">
              {products && products.length < countProducts && (
                <button
                  className="btn"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  {isLoadingMore
                    ? "More products are loading..."
                    : " Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
