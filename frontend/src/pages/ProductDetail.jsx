import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);

// Buy Now → go to checkout with product and quantity
const handleBuyNow = () => {
  navigate("/checkout", {
    state: {
      items: [{
        product_id: productId,
        name: product.name,
        price: product.discounted_price,
        image: mainImage,
        quantity
      }]
    }
  });
};

// Add to Cart → store in localStorage or context
const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.product_id === productId);
  if (existing) {
    existing.quantity = Math.min(10, existing.quantity + quantity);
  } else {
    cart.push({
      product_id: productId,
      name: product.name,
      price: product.discounted_price,
      image: mainImage,
      quantity
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};


  useEffect(() => {
    axios.get(`http://localhost:8025/products/${productId}`)
      .then(res => {
        const validImages = res.data.image_urls?.filter(Boolean) || [];
        setProduct(res.data);
        setMainImage(validImages[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  const fetchReviews = () => {
    axios.get(`http://localhost:8025/reviews/${productId}?page=${page}&sort=${sort}`)
      .then(res => {
        if (page === 1) {
          setReviews(res.data);
        } else {
          setReviews(prev => [...prev, ...res.data]);
        }
        setHasMore(res.data.length > 0);
      })
      .catch(err => console.error("Error fetching reviews:", err));
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, sort, page]);

const submitReview = () => {
  const reviewPayload = {
    user: newReview.user,
    rating: newReview.rating,
    comment: newReview.comment,
    product_id: productId,
    timestamp: new Date().toISOString()
  };

  axios.post("http://localhost:8025/reviews", reviewPayload)
    .then(() => {
      setNewReview({ user: "", rating: 5, comment: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
      setPage(1);
      fetchReviews();
    })
    .catch(err => console.error("Error submitting review:", err));
};


  if (loading) return <div className="text-center py-5">⏳ Loading product...</div>;
  if (!product) return <div className="text-center py-5 text-danger">⚠️ Product not found</div>;

  return (
    <div className="container py-5">
      <div className="row mb-3">
        <div className="col-md-6 text-center">
          <img src={mainImage} alt={product.name} className="img-fluid rounded shadow-sm" style={{ maxHeight: "350px", objectFit: "cover" }} />
          <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
            {product.image_urls?.filter(Boolean).map((url, idx) => (
              <img key={idx} src={url} alt={`Thumbnail ${idx + 1}`} className="rounded border" style={{
                width: "70px", height: "70px", objectFit: "cover", cursor: "pointer",
                border: url === mainImage ? "2px solid orange" : "1px solid #ccc"
              }} onClick={() => setMainImage(url)} />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <div className="mb-2">
            <span className="text-danger fs-4 fw-bold me-2">Rs.{product.discounted_price}</span>
            <span className="text-muted text-decoration-line-through me-2">Rs.{product.price}</span>
            <span className="badge bg-warning text-dark">{Math.round(product.discount_percent)}% OFF</span>
          </div>
          <p className="text-muted small"><strong>Category:</strong> {product.category || "General"}</p>
          <p className="text-muted small"><strong>Available Quantity:</strong> {product.quantity}</p>
          <p className="text-muted small"><strong>Rating:</strong> ⭐ {product.rating} ({product.review_count} reviews)</p>
          <div className="mt-4"><h6>Description</h6><p>{product.description || "No description available."}</p></div>
          {product.tags?.length > 0 && (
            <div className="mt-3">
              <h6>Tags</h6>
              <div className="d-flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="badge bg-light text-dark border">#{tag}</span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3">
  <label className="form-label fw-bold">Quantity</label>
  <div className="d-flex align-items-center gap-2">
    <button
      className="btn btn-outline-secondary"
      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
      disabled={quantity <= 1}
    >
      −
    </button>
    <input
      type="number"
      className="form-control text-center"
      style={{ width: "60px" }}
      value={quantity}
      onChange={(e) => {
        const val = Math.min(10, Math.max(1, Number(e.target.value)));
        setQuantity(val);
      }}
    />
    <button
      className="btn btn-outline-secondary"
      onClick={() => setQuantity(prev => Math.min(10, Math.min(product.quantity, prev + 1)))}
      disabled={quantity >= Math.min(10, product.quantity)}
    >
      +
    </button>
  </div>
  <small className="text-muted">Max 10 per order. Available: {product.quantity}</small>
</div>

          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button>
            <button className="btn btn-outline-secondary" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="mb-4 fw-bold text-uppercase" style={{ color: "#f57224" }}>🗣️ Customer Reviews</h4>

        <div className="mb-4">
  {[5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percent = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    const emojiMap = {
      5: "😍",
      4: "🙂",
      3: "😐",
      2: "😕",
      1: "😡"
    };
    return (
      <div key={star} className="mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-dark fw-bold">{emojiMap[star]} {star} Stars</span>
          <span className="text-muted small">{count} reviews</span>
        </div>
        <div className="progress" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  })}
</div>


        {reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          <Swiper spaceBetween={0} slidesPerView={2} pagination={{ clickable: true }} style={{ paddingBottom: "2rem" }}>
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-3 rounded shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #eee" , width: "90%"}}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle text-white fw-bold d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px", backgroundColor: "#f57224" }}>
                        {review.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong className="text-dark">{review.user}</strong>
                        <span className="badge bg-success ms-2" title="Verified purchase">✔ Verified</span>
                        <div className="text-muted small">{new Date(review.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <span className="badge bg-warning text-dark">⭐ {review.rating}</span>
                  </div>
                  {review.comment && <p className="mb-0 text-dark">{review.comment}</p>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {hasMore && (
          <div className="text-center mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setPage(prev => prev + 1)}>Load More</button>
          </div>
        )}
      </div>

      <div className="mt-5">
  <h4 className="mb-3 fw-bold text-uppercase" style={{ color: "#f57224" }}>✍️ Write a Review</h4>
  <div
    className="card p-4 shadow-sm"
    style={{
      border: "1px solid #f57224",
      transition: "box-shadow 0.3s ease",
      backgroundColor: "#fff",
    }}
  >
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Your Name"
      value={newReview.user}
      onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
    />

    {/* Animated Star Rating Input */}
    <div className="d-flex gap-2 mb-3" style={{ cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "1.5rem",
            color:
              hoverRating >= star || newReview.rating >= star
                ? "#f57224"
                : "#ccc",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setNewReview({ ...newReview, rating: star })}
        >
          ★
        </span>
      ))}
    </div>

    <textarea
      className="form-control mb-3"
      placeholder="Share your experience..."
      value={newReview.comment}
      onChange={(e) =>
        setNewReview({ ...newReview, comment: e.target.value })
      }
    />
    <button
      className="btn w-100 text-white fw-bold"
      style={{ backgroundColor: "#f57224" }}
      onClick={submitReview}
    >
      Submit Review
    </button>
    {submitted && (
  <div className="text-success text-center mt-3" style={{ transition: "opacity 0.5s ease-in-out" }}>
    ✅ Review submitted successfully!
  </div>
)}
  </div>
</div>
    </div>
  );
};

export default ProductDetail;
