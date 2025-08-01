import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FlashSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8025/products/flash-sale")
      .then(res => setProducts(res.data.products))
      .catch(err => console.error("Flash Sale API Error:", err));
  }, []);

  return (
    <div className="flash-sale-wrapper py-4">
      <div
        className="flash-sale-section bg-white shadow-sm rounded px-4 py-4"
        style={{ width: "80%", margin: "0 auto" }}
      >
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold mb-0">🕒 Flash Sale</h4>
            <span className="text-orange fw-semibold small">On Sale Now</span>
          </div>
          <Link to="/flash-sale-all" className="flash-sale-btn">
            SHOP ALL PRODUCTS
          </Link>
        </div>

        {/* Product Grid */}
        <div className="row gy-4">
          {products.slice(0, 6).map((item) => (
            <div className="col-6 col-md-4 col-lg-2" key={item._id}>
              <Link to={`/products/${item._id}`} className="text-decoration-none text-dark">
                <div className="card h-100 border-0 shadow-sm flash-sale-card">
                  <img
                    src={item.image_urls?.[0]}
                    className="card-img-top"
                    alt={item.name}
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
    </div>
  );
};

export default FlashSale;
