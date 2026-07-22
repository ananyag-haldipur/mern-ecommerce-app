import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function AdminEditProduct(){

const {id}=useParams();

const navigate=useNavigate();


const [product,setProduct]=useState({
name:"",
description:"",
price:"",
image:"",
category:"",
stock:""
});



useEffect(()=>{

loadProduct();

},[]);



const loadProduct=async()=>{

const res=await axios.get(
`http://localhost:5000/api/products/${id}`
);

setProduct(res.data);

};



const handleChange=(e)=>{

setProduct({
...product,
[e.target.name]:e.target.value
});

};



const updateProduct=async(e)=>{

e.preventDefault();


const token =
localStorage.getItem("token");


await axios.put(
`http://localhost:5000/api/admin/products/${id}`,
product,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


alert("Product Updated");


navigate("/admin/products");

};



return(

<div className="container mt-5">

<h2>
✏️ Edit Product
</h2>


<form
className="card p-4 shadow"
onSubmit={updateProduct}
>


<input
className="form-control mb-3"
name="name"
value={product.name}
onChange={handleChange}
/>


<textarea
className="form-control mb-3"
name="description"
value={product.description}
onChange={handleChange}
/>


<input
className="form-control mb-3"
name="price"
value={product.price}
onChange={handleChange}
/>


<input
className="form-control mb-3"
name="image"
value={product.image}
onChange={handleChange}
/>


<input
className="form-control mb-3"
name="category"
value={product.category}
onChange={handleChange}
/>


<input
className="form-control mb-3"
name="stock"
value={product.stock}
onChange={handleChange}
/>


<button className="btn btn-success">
Update Product
</button>


</form>


</div>

)

}


export default AdminEditProduct;