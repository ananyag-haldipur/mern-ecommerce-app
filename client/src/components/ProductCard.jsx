import { Link } from "react-router-dom";


function ProductCard({ product }) {


  return (

    <div className="card h-100 shadow-sm rounded-4">


      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.name}
        style={{
          height:"220px",
          objectFit:"contain"
        }}
      />



      <div className="card-body">


        <h5 className="card-title">
          {product.name}
        </h5>


        <p className="text-muted">
          {product.description}
        </p>


        <h4 className="text-success">
          ₹ {product.price}
        </h4>


        <p>
          In Stock ({product.stock})
        </p>


        <p>
          ⭐⭐⭐⭐⭐
        </p>



        <Link
          to={`/product/${product._id}`}
          className="btn btn-primary w-100"
        >
          View Product
        </Link>


      </div>


    </div>

  );

}


export default ProductCard;