import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Remove old products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany(products);

    console.log("✅ Products Imported Successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

importData();