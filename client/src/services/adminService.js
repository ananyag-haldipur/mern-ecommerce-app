import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";


// Get admin products
export const getAdminProducts = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/products`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return response.data;
};



// Delete product
export const deleteProduct = async(id)=>{

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/products/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return response.data;
};