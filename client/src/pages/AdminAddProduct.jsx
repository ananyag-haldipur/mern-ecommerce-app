import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AdminAddProduct(){

const navigate = useNavigate();


const [product,setProduct]=useState({

name:"",
description:"",
price:"",
image:"",
category:"",
stock:""

});



const handleChange=(e)=>{

setProduct({

...product,

[e.target.name]:e.target.value

});

};



const handleSubmit=async(e)=>{

e.preventDefault();


try{

const token =
localStorage.getItem("token");


await axios.post(

"http://localhost:5000/api/admin/products",

product,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


alert("✅ Product Added");


navigate("/admin/products");


}
catch(error){

console.log(error);

}

};



return(

<div className="container mt-5">


<h2 className="fw-bold">
➕ Add Product
</h2>



<form
className="card p-4 shadow mt-4"
onSubmit={handleSubmit}
>



<input
className="form-control mb-3"
placeholder="Product Name"
name="name"
onChange={handleChange}
/>



<textarea
className="form-control mb-3"
placeholder="Description"
name="description"
onChange={handleChange}
/>



<input
className="form-control mb-3"
placeholder="Price"
name="price"
onChange={handleChange}
/>



<input
className="form-control mb-3"
placeholder="Image Path"
name="image"
onChange={handleChange}
/>



<input
className="form-control mb-3"
placeholder="Category"
name="category"
onChange={handleChange}
/>



<input
className="form-control mb-3"
placeholder="Stock"
name="stock"
onChange={handleChange}
/>



<button
className="btn btn-success"
>
Add Product
</button>



</form>


</div>

)

}


export default AdminAddProduct;