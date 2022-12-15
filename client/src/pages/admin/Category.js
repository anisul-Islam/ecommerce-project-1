import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/AdminSidebar";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../services/CategoryService";

export const Category = () => {
  const adminData = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.user.data.token);

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createCategory({ name, token });
      toast.success(response.message);
      fetchCategories();
      // console.log(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteCategory({ id, token });
      console.log(response);
      toast.success(response.message);
      fetchCategories();
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
            <h2>Create Category</h2>
            <div className="card">
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="name"> Name: </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-control">
                  <button type="submit" className="btn">
                    Create
                  </button>
                </div>
              </form>
            </div>

            <div className="categories">
              <h3>All the categories</h3>
              <div className="categories__list">
                {categories &&
                  categories.map((category) => {
                    return (
                      <div key={category._id}>
                        <button className="btn category__btn">
                          {category.name}
                        </button>
                        <div className="center">
                          <button className="btn action-btn">Edit</button>
                          <button
                            className="btn action-btn"
                            onClick={() => {
                              handleDelete(category._id);
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
