import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const registerUser = async (user) => {
  const response = await axios.post(`${baseURL}/register`, user);
  return response.data;
};

export const accountActivation = async (data) => {
  const response = await axios.post(`${baseURL}/account-activation`, data);
  return response.data;
};

export const loginUser = async (user) => {
  const response = await axios.post(`${baseURL}/login`, user);
  return response.data;
};

export const userProfile = async () => {
  const response = await axios.get(`${baseURL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};
export const authorizeUser = async (token) => {
  const response = await axios.get(`${baseURL}/auth-check`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
export const isAdminCheck = async (token) => {
  const response = await axios.get(`${baseURL}/admin-check`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
