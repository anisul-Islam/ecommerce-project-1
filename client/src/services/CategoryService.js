import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const createCategory = async ({ name, token }) => {
  const response = await axios.post(
    `${baseURL}/categories`,
    { name },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${baseURL}/categories`);
  return response.data;
};

export const deleteCategory = async ({ id, token }) => {
  const response = await axios.delete(`${baseURL}/categories/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
