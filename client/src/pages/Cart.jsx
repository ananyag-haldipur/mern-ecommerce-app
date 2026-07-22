import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../services/cartService";


function Cart() {

  const [cart, setCart] = useState(null);

  const navigate = useNavigate();



  useEffect(() => {
    loadCart();
  }, []);



  const loadCart = async () => {

    try {

      const token = localStorage.getItem("token");

      const data = await getCart(token);

      setCart(data);


    } catch (error) {

      console.log(error);

    }

  };





  const changeQuantity = async (productId, quantity) => {

    if (quantity < 1)
      return;


    try {

      const token = localStorage.getItem("token");


      const data = await updateCartQuantity(
        productId,
        quantity,
        token
      );


      setCart(data);


    } catch (error) {

      console.log(error);

    }

  };





  const removeItem = async (productId) => {

    try {

      const token = localStorage.getItem("token");


      const data = await removeFromCart(
        productId,
        token
      );


      setCart(data);


    } catch (error) {

      console.log(error);

    }

  };





  if (!cart) {

    return (

      <h3 className="text-center mt-5">
        Loading Cart...
      </h3>

    );

  }





  const total =
    cart.items.reduce(
      (sum, item) =>
        sum +
        item.product.price *
        item.quantity,
      0
    );





  return (

    <div className="container mt-5">


      <h2 className="fw-bold mb-4">
        🛒 My Cart
      </h2>




      {
        cart.items.length === 0 ?

          (

            <div className="text-center">

              <h3>
                Cart is Empty
              </h3>

            </div>

          )

          :

          (

            <div className="row">



              <div className="col-md-8">


                {
                  cart.items.map(item => (


                    <div
                      key={item._id}
                      className="card mb-3 shadow-sm rounded-4"
                    >


                      <div className="row align-items-center">


                        <div className="col-md-4 text-center">


                          <img
                            src={item.product.image}
                            className="img-fluid p-3"
                            alt={item.product.name}
                            style={{
                              height: "150px",
                              objectFit: "contain"
                            }}
                          />


                        </div>





                        <div className="col-md-8">


                          <div className="card-body">


                            <h5 className="fw-bold">
                              {item.product.name}
                            </h5>



                            <h5 className="text-success">
                              ₹ {item.product.price}
                            </h5>





                            <div className="d-flex align-items-center gap-3">


                              <button
                                className="btn btn-outline-danger"
                                onClick={() =>
                                  changeQuantity(
                                    item.product._id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>




                              <b>
                                {item.quantity}
                              </b>





                              <button
                                className="btn btn-outline-success"
                                onClick={() =>
                                  changeQuantity(
                                    item.product._id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>


                            </div>





                            <button
                              className="btn btn-danger mt-3"
                              onClick={() =>
                                removeItem(
                                  item.product._id
                                )
                              }
                            >

                              🗑 Remove

                            </button>



                          </div>


                        </div>


                      </div>


                    </div>


                  ))
                }


              </div>







              <div className="col-md-4">


                <div className="card p-4 shadow rounded-4">


                  <h4>
                    Order Summary
                  </h4>


                  <hr />



                  <h3 className="text-success">
                    ₹ {total}
                  </h3>





                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() => navigate("/checkout")}
                  >

                    🚚 Checkout

                  </button>



                </div>


              </div>





            </div>

          )

      }



    </div>

  );

}


export default Cart;