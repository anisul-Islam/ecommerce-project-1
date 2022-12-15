import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { accountActivation } from "../services/UserService";

const Activate = () => {
  const { jwtToken } = useParams();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const { name } = jwtDecode(jwtToken);
    console.log(name);
    if (jwtToken) {
      setName(name);
      setToken(jwtToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountActivation({ token });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const activationLink = (
    <div>
      <h1>Hello {name}, Ready to Activate your account?</h1>
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      {show && activationLink}
    </div>
  );
};

export default Activate;
