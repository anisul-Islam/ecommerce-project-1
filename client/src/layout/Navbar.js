import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import SearchForm from "../components/SearchForm";
import { logout } from "../features/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.data);
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      dispatch(logout());
      return new Error(error);
    }
  };

  return (
    <nav>
      <NavLink to="/" className="nav__link">
        Home
      </NavLink>
      <NavLink to="/shop" className="nav__link">
        Shop
      </NavLink>

      <SearchForm />
      {!user.isLoggedIn && (
        <>
          <NavLink to="/register" className="nav__link">
            Register
          </NavLink>
          <NavLink to="/login" className="nav__link">
            Login
          </NavLink>
        </>
      )}
      {user.isLoggedIn && (
        <div className="dropdown">
          <button className="dropbtn">{user.userData.name}</button>
          <ul className="dropdown-content">
            <li>
              <NavLink
                to="/logout"
                className="nav__link"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/dashboard/${user.userData.role === 1 ? "admin" : "user"}`}
                className="nav__link"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <NavLink to="/cart" className="nav__link">
        <CartIcon
          value={cartItems && cartItems.length >= 1 ? cartItems.length : 0}
        />
      </NavLink>
    </nav>
  );
};

export default Navbar;
