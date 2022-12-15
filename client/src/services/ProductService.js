import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const createProduct = async (newProduct, token) => {
  const response = await axios.post(`${baseURL}/products`, newProduct, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// new changes
export const getProducts = async (page) => {
  const response = await axios.get(`${baseURL}/products?page=${page}`);
  return response.data;
};

// new changes
export const searchProducts = async (serachValue) => {
  const response = await axios.get(`${baseURL}/products/search/${serachValue}`);
  return response.data;
};

// new changes
export const getTotalProducts = async () => {
  const response = await axios.get(`${baseURL}/products-count`);
  return response.data;
};

export const getFilteredProducts = async (checkedCategories, checkedPrice) => {
  const response = await axios.post(`${baseURL}/filtered-products`, {
    checkedCategories,
    checkedPrice,
  });
  return response.data;
};
export const getPhoto = async (productId) => {
  const response = await axios.get(`${baseURL}/products/photo/${productId}`);
  return response.data;
};

export const deleteProduct = async ({ id, token }) => {
  const response = await axios.delete(`${baseURL}/products/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// payment gateway
export const getBrainstreeToken = async () => {
  const response = await axios.get(`${baseURL}/braintree/token`);
  return response.data;
};
export const processPayment = async (nonce, cartItems, token) => {
  const response = await axios.post(
    `${baseURL}/braintree/payment`,
    {
      nonce,
      cartItems,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const fetchOrders = async (token) => {
  const response = await axios.get(`${baseURL}/orders`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const fetchAllOrdersForAdmin = async (token) => {
  const response = await axios.get(`${baseURL}/all-orders`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
export const updateOrderStatus = async (id, status, token) => {
  const response = await axios.put(
    `${baseURL}/order-status/${id}`,
    { status },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
