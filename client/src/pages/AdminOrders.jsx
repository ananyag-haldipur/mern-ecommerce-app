import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/adminOrderService";


function AdminOrders() {


  const [orders, setOrders] = useState([]);



  useEffect(() => {

    loadOrders();

  }, []);




  const loadOrders = async () => {

    try {

      const data = await getAllOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

    }

  };




  const changeStatus = async (id, status) => {

    try {

      await updateOrderStatus(id, status);

      loadOrders();

    } catch (error) {

      console.log(error);

    }

  };




  return (

    <div className="container mt-5">


      <h2 className="fw-bold mb-4">
        📦 Manage Orders
      </h2>




      {
        orders.length === 0 ? (

          <h4>
            No Orders Found
          </h4>

        ) : (


          orders.map((order) => (


            <div
              key={order._id}
              className="card shadow p-4 mb-4 rounded-4"
            >


              <h5>
                🧾 Order ID
              </h5>

              <p className="text-muted">
                {order._id}
              </p>




              <h5>
                👤 Customer
              </h5>

              <p>
                {order.user
                  ? order.user.name
                  : "Guest User"}
              </p>

              <p>
                {order.user?.email}
              </p>





              <h5>
                📦 Products
              </h5>


              {
                order.orderItems.map((item) => (


                  <div
                    key={item._id}
                    className="border rounded p-2 mb-2"
                  >

                    <b>
                      {item.name}
                    </b>

                    <br />

                    Quantity:
                    {item.quantity}

                    <br />

                    Price:
                    ₹ {item.price}


                  </div>


                ))
              }





              <h5 className="mt-3">
                💰 Total:
                ₹ {order.totalPrice}
              </h5>





             <h5>
🚚 Shipping Address
</h5>

<p>

<b>
{order.shippingAddress?.fullName}
</b>

<br/>

📞 {order.shippingAddress?.phone}

<br/>

{order.shippingAddress?.address}

<br/>

{order.shippingAddress?.city},
{order.shippingAddress?.state}

<br/>

Pincode:
{order.shippingAddress?.pincode}

</p>





              <h5>
                📅 Order Date
              </h5>

              <p>
                {new Date(order.createdAt)
                  .toLocaleDateString()}
              </p>






             <h5>
  Status
</h5>


<div className="mb-3">

{
  order.status === "Pending" && (
    <span className="badge bg-warning text-dark fs-6">
      🟡 Pending
    </span>
  )
}


{
  order.status === "Shipped" && (
    <span className="badge bg-primary fs-6">
      🚚 Shipped
    </span>
  )
}


{
  order.status === "Delivered" && (
    <span className="badge bg-success fs-6">
      ✅ Delivered
    </span>
  )
}

</div>



<select
className="form-select"

value={order.status}

onChange={(e)=>
  changeStatus(
    order._id,
    e.target.value
  )
}

>

<option value="Pending">
Pending
</option>


<option value="Shipped">
Shipped
</option>


<option value="Delivered">
Delivered
</option>


</select>



            </div>


          ))

        )

      }


    </div>

  );

}


export default AdminOrders;