import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";


// Add product to cart
export const addToCart = async (
  productId,
  quantity,
  token
) => {

  const response = await axios.post(
    API_URL,
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// Get cart
export const getCart = async (token) => {

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// Update quantity
export const updateCartQuantity = async (
  productId,
  quantity,
  token
) => {

  const response = await axios.put(
    `${API_URL}/${productId}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// Remove product
export const removeFromCart = async (
  productId,
  token
) => {

  const response = await axios.delete(
    `${API_URL}/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// Clear cart
export const clearCart = async (token) => {

  const response = await axios.delete(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};