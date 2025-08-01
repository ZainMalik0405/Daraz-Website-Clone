import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFlashProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8025/products/flash-sale-all")
      .then(res => setProducts(res.data.products))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">🛒 All Flash Sale Products</h2>
      <div className="row gy-4">
        {products.map((item) => (
          <div className="col-6 col-md-4 col-lg-2" key={item._id}>
            <Link to={`/products/${item._id}`} className="text-decoration-none text-dark">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={item.image_urls?.[0]}
                  alt={item.name}
                  className="card-img-top"
                />
                <div className="card-body p-2">
                  <p className="card-title mb-1">{item.name}</p>
                  <p className="mb-0 fw-bold text-orange">Rs.{item.discounted_price}</p>
                  <small className="text-muted text-decoration-line-through">
                    Rs.{item.price}
                  </small>
                  <span className="badge bg-orange ms-2">
                    {Math.round(item.discount_percent)}% OFF
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlashProducts;
