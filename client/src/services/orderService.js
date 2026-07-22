import axios from "axios";


const API_URL =
"http://localhost:5000/api/orders";



// Place Order
export const placeOrder = async(
  shippingAddress,
  token
)=>{

  const response = await axios.post(
    API_URL,
    {
      shippingAddress
    },
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );


  return response.data;

};




// Get My Orders
export const getMyOrders = async(token)=>{


  const response = await axios.get(
    `${API_URL}/myorders`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );


  return response.data;


};