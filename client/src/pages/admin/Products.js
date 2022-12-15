import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/AdminSidebar";
import { deleteProduct, getProducts } from "../../services/ProductService";

export const Products = () => {
  const adminData = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.user.data.token);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct({ id, token });
      toast.success(response.message);
      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      {adminData ? (
        <div className="container-full">
          <AdminSidebar adminData={adminData} />
          <ToastContainer />
          <div className="main-content">
            <div className="products">
              <h3>All the Products</h3>
              <div className="products__card">
                {products &&
                  products.map((product) => {
                    return (
                      <div key={product._id} className="product">
                        <img
                          className="product-img"
                          src={`http://localhost:8000/api/products/photo/${product._id}`}
                          alt={product.name}
                        />
                        <h3>Name: {product.name}</h3>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>
                          Shipping Possible: {product.shipping ? "Yes" : "No"}
                        </p>
                        <p>Sold: {product.sold}</p>
                        {/* {console.log(
                          dayjs(product.createdAt).format(
                            "{YYYY} MM-DDTHH:mm:ss SSS [Z] A"
                          )
                        )} */}
                        <p>
                          {" "}
                          Created At:
                          {moment(product.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                        <div className="center">
                          <button className="btn action-btn">Edit</button>
                          <button
                            className="btn action-btn"
                            onClick={() => {
                              handleDelete(product._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
