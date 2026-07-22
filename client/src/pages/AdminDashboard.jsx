import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AdminDashboard() {


  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });



  useEffect(() => {
    loadDashboard();
  }, []);




  const loadDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");


      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setStats(res.data);


    } catch (error) {

      console.log(error);

    }

  };




  return (

    <div className="container mt-5">


      <h1 className="fw-bold">
        Admin Dashboard
      </h1>



      <div
        className="row mt-4"
      >


        <div className="col-md-3">

          <div className="card shadow p-3 text-center">

            <h4>
              📦 Products
            </h4>

            <h1>
              {stats.totalProducts}
            </h1>

          </div>

        </div>




        <div className="col-md-3">

          <div className="card shadow p-3 text-center">

            <h4>
              🛒 Orders
            </h4>

            <h1>
              {stats.totalOrders}
            </h1>

          </div>

        </div>





        <div className="col-md-3">

          <div className="card shadow p-3 text-center">

            <h4>
              👥 Users
            </h4>

            <h1>
              {stats.totalUsers}
            </h1>

          </div>

        </div>





        <div className="col-md-3">

          <div className="card shadow p-3 text-center">

            <h4>
              💰 Revenue
            </h4>

            <h1>
              ₹ {stats.totalRevenue}
            </h1>

          </div>

        </div>



      </div>






      <div className="mt-5">


        <Link to="/admin/products">

          <button className="btn btn-dark me-3">

            📦 Manage Products

          </button>

        </Link>





        <Link to="/admin/orders">

          <button className="btn btn-warning me-3">

            🛒 Manage Orders

          </button>

        </Link>





        <Link to="/admin/add-product">

          <button className="btn btn-primary">

            ➕ Add Product

          </button>

        </Link>



      </div>



    </div>

  );

}


export default AdminDashboard;