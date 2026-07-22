import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";


function App() {

  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route 
          path="/" 
          element={<Home />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route 
          path="/register" 
          element={<Register />} 
        />

        <Route 
          path="/product/:id" 
          element={<ProductDetails />} 
        />


        {/* User Protected Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />


        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />


        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />


        {/* Admin Protected Routes */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <AdminEditProduct />
            </AdminRoute>
          }
        />


      </Routes>

    </>
  );
}


export default App;