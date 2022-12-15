import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Activate from "../auth/Activate";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Protected from "./ProtectedRoute";

import {
  Home,
  Login,
  Register,
  UserDashboard,
  AdminDashboard,
  Shop,
  Search,
  AdminOrder,
} from "../pages";
import AdminRoute from "./AdminRoute";
import { Category } from "../pages/admin/Category";
import { Product } from "../pages/admin/Product";
import { Profile } from "../pages/user/Profile";
import { UserOrder } from "../pages/user/UserOrder";
import { Products } from "../pages/admin/Products";
import { Cart } from "../pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Header /> */}
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/activate/:jwtToken" element={<Activate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<UserOrder />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<Category />} />
            <Route path="admin/product" element={<Product />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<AdminOrder />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
