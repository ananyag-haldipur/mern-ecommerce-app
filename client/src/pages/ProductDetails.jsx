import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
      alert("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      await addToCart(product._id, 1, token);

      alert("✅ Product Added to Cart");

      navigate("/cart");
    } catch (error) {
      console.error(
        "Add To Cart Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to add product to cart."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-danger">
          Product not found.
        </h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="row shadow rounded-4 bg-white p-4">

        <div className="col-md-5 text-center">

          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />

        </div>

        <div className="col-md-7">

          <h2 className="fw-bold">
            {product.name}
          </h2>

          <h3 className="text-success">
            ₹ {product.price}
          </h3>

          <p className="text-warning fs-5">
            ⭐⭐⭐⭐⭐
          </p>

          <p>
            {product.description}
          </p>

          <h5>
            Category:
            <span className="badge bg-primary ms-2">
              {product.category}
            </span>
          </h5>

          <h5 className="mt-3">
            Stock:
            <span className="badge bg-success ms-2">
              {product.stock}
            </span>
          </h5>

          <button
            className="btn btn-success btn-lg mt-4"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;