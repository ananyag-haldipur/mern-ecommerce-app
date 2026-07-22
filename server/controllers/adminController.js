import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";


// Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();


    const revenueResult = await Order.aggregate([
      {
        $group:{
          _id:null,
          totalRevenue:{
            $sum:"$totalPrice"
          }
        }
      }
    ]);


    const totalRevenue =
      revenueResult.length
      ? revenueResult[0].totalRevenue
      : 0;


    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};



// Add Product
export const addProduct = async(req,res)=>{

  try{

    const product =
    await Product.create(req.body);


    res.status(201).json(product);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};



// Get Products
export const getAdminProducts = async(req,res)=>{

  try{

    const products =
    await Product.find();


    res.json(products);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};



// Update Product
export const updateProduct = async(req,res)=>{

  try{

    const product =
    await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true
      }
    );


    res.json(product);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};



// Delete Product
export const deleteProduct = async(req,res)=>{

  try{

    await Product.findByIdAndDelete(
      req.params.id
    );


    res.json({
      message:"Product Deleted"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};