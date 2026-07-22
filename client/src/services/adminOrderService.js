import axios from "axios";


const API_URL =
"http://localhost:5000/api/orders";



export const getAllOrders = async()=>{

const token =
localStorage.getItem("token");


const res = await axios.get(
`${API_URL}/all`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


return res.data;

};





export const updateOrderStatus = async(
id,
status
)=>{


const token =
localStorage.getItem("token");


const res = await axios.put(

`${API_URL}/${id}/status`,

{
status
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


return res.data;


};