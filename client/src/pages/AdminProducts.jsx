import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import {
  getAdminProducts,
  deleteProduct
} from "../services/adminService";


function AdminProducts(){

const [products,setProducts]=useState([]);
const navigate = useNavigate();


useEffect(()=>{

loadProducts();

},[]);



const loadProducts=async()=>{

try{

const data =
await getAdminProducts();

setProducts(data);

}catch(error){

console.log(error);

}

};




const handleDelete=async(id)=>{

if(window.confirm("Delete Product?")){

await deleteProduct(id);

loadProducts();

}

};




return(

<div className="container mt-5">


<h2 className="fw-bold mb-4">
📦 Manage Products
</h2>



<table className="table table-bordered shadow">

<thead className="table-dark">

<tr>

<th>Name</th>
<th>Price</th>
<th>Category</th>
<th>Stock</th>
<th>Action</th>

</tr>

</thead>


<tbody>


{
products.map(product=>(

<tr key={product._id}>


<td>
{product.name}
</td>


<td>
₹ {product.price}
</td>


<td>
{product.category}
</td>


<td>
{product.stock}
</td>


<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={() =>
navigate(`/admin/edit-product/${product._id}`)
}
>
✏️ Edit
</button>


<button
className="btn btn-danger btn-sm"
onClick={() =>
handleDelete(product._id)
}
>
🗑 Delete
</button>

</td>


</tr>


))
}



</tbody>


</table>


</div>

)

}


export default AdminProducts;