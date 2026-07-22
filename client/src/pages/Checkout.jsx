import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../services/orderService";


function Checkout() {


  const navigate = useNavigate();


  const [address, setAddress] = useState({

    fullName:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    pincode:"",
    country:"India"

  });





  const handleChange = (e) => {

    setAddress({

      ...address,

      [e.target.name]: e.target.value

    });

  };






  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      const token =
      localStorage.getItem("token");



      await placeOrder(
        address,
        token
      );



      alert("✅ Order Placed Successfully");


      navigate("/orders");



    } catch(error) {


      console.log(error);


      alert("Order Failed");


    }


  };







  return (

    <div className="container mt-5">


      <h2 className="fw-bold mb-4">
        🚚 Checkout
      </h2>




      <form
        className="card shadow p-4 rounded-4"
        onSubmit={handleSubmit}
      >



        <input
          className="form-control mb-3"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          required
        />



        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          required
        />



        <textarea
          className="form-control mb-3"
          name="address"
          placeholder="Address"
          value={address.address}
          onChange={handleChange}
          required
        />



        <input
          className="form-control mb-3"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />



        <input
          className="form-control mb-3"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
        />



        <input
          className="form-control mb-3"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
        />



        <button
          className="btn btn-success"
          type="submit"
        >

          Place Order

        </button>



      </form>


    </div>

  );

}


export default Checkout;