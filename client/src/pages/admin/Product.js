import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/AdminSidebar";
import { getCategories } from "../../services/CategoryService";
import { createProduct } from "../../services/ProductService";

export const Product = () => {
  const navigate = useNavigate();
  const adminData = useSelector((state) => state.user.data.userData);
  const token = useSelector((state) => state.user.data.token);

  // name, description, price, category, quantity, shipping
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [shipping, setShipping] = useState("0");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(categories);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newProduct = new FormData();
      newProduct.append("photo", photo);
      newProduct.append("name", name);
      newProduct.append("description", description);
      newProduct.append("price", price);
      newProduct.append("category", categoryId);
      newProduct.append("shipping", shipping);
      newProduct.append("quantity", quantity);

      const response = await createProduct(newProduct, token);
      console.log(response);
      // toast.success(response.message);
      // fetchCategories();
      navigate("/dashboard/admin/products");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      {adminData ? (
        <div className="container-full">
          <AdminSidebar adminData={adminData} />
          <ToastContainer />
          <div className="main-content">
            <h2>Create Product</h2>

            {/* photo preview and get photo  */}
            {photo && (
              <div>
                <img
                  className="product-img"
                  src={URL.createObjectURL(photo)}
                  alt=" product"
                />
              </div>
            )}

            <div>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>

            {/* show categories */}
            <div className="category">
              <label>Select Category: </label>
              <select
                name="category"
                id="category"
                onChange={handleCategoryIdChange}
                value={categoryId}
              >
                {categories.map((category) => {
                  const { _id, name } = category;
                  return (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* create product  */}
            <div className="card">
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="name"> Name: </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="description"> description: </label>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                  >
                    {" "}
                  </textarea>
                </div>

                <div className="form-control">
                  <label htmlFor="price"> Price: </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="quantity"> Quantity: </label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>

                <div className="form-control">
                  <label>Select Shipping: </label>
                  <select
                    name="shipping"
                    id="shipping"
                    onChange={handleShippingChange}
                    value={shipping}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div className="form-control">
                  <button type="submit" className="btn">
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
