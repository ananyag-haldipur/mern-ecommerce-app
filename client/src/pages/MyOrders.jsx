import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getMyOrders(token);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>Order ID</h3>

            <p>{order._id}</p>

            <p>
  Status:

  {
    order.status === "Pending" && (
      <span className="badge bg-warning text-dark ms-2">
        🟡 Pending
      </span>
    )
  }


  {
    order.status === "Shipped" && (
      <span className="badge bg-primary ms-2">
        🚚 Shipped
      </span>
    )
  }


  {
    order.status === "Delivered" && (
      <span className="badge bg-success ms-2">
        ✅ Delivered
      </span>
    )
  }

</p>

            <p>
              <strong>Total:</strong> ₹ {order.totalPrice}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h4>Products</h4>

            {order.orderItems?.map((item) => (
              <div key={item._id}>
                <p>
                  <strong>{item.name || "Product deleted"}</strong>
                </p>

                <p>
                  Price: ₹ {item.price || "-"}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;