import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:9000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-success">Latest Products</h2>
      <div className="row">
        {products.map((product, i) => (
          <div className="col-md-3 mb-4" key={i}>
            <div className="card h-100 shadow-sm">
              <img src={product.image_url} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="text-danger fw-bold">PKR {product.price}</p>
                <p className={`text-${product.quantity > 0 ? "success" : "danger"}`}>
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
