const FlashSale = () => (
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
        <a href="#" className="flash-sale-btn">
  SHOP ALL PRODUCTS
</a>
      </div>

      {/* Product Grid */}
      <div className="row gy-4">
        {[
          {
            name: "Airpod Pro Air Pro TWS",
            price: "Rs.766",
            original: "Rs.1,999",
            discount: "62%",
            img: "https://img.drz.lazcdn.com/static/pk/p/ab5135ffd822bd086e8360e0693ef300.png_400x400q80.png_.webp",
          },
          {
            name: "Bluetooth Earphones Headphones",
            price: "Rs.798",
            original: "Rs.1,999",
            discount: "60%",
            img: "https://img.lazcdn.com/us/images/ims-web/flash2.jpg",
          },
          {
            name: "M10, A6s, F2 earbuds",
            price: "Rs.641",
            original: "Rs.1,999",
            discount: "68%",
            img: "https://img.lazcdn.com/us/images/ims-web/flash3.jpg",
          },
          {
            name: "Morinaga BF-1 Infant Formula",
            price: "Rs.2,579",
            original: "Rs.2,650",
            discount: "3%",
            img: "https://img.lazcdn.com/us/images/ims-web/flash4.jpg",
          },
          {
            name: "Electric Kitchen Lighter",
            price: "Rs.1,130",
            original: "Rs.3,000",
            discount: "62%",
            img: "https://img.lazcdn.com/us/images/ims-web/flash5.jpg",
          },
          {
            name: "Wireless Headset 5.3 Bluetooth",
            price: "Rs.705",
            original: "Rs.2,999",
            discount: "76%",
            img: "https://img.lazcdn.com/us/images/ims-web/flash6.jpg",
          },
        ].map((item, idx) => (
          <div className="col-6 col-md-4 col-lg-2" key={idx}>
            <div className="card h-100 border-0 shadow-sm flash-sale-card">
              <img
                src={item.img}
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body p-2">
                <p className="card-title mb-1">{item.name}</p>
                <p className="mb-0 fw-bold text-orange">{item.price}</p>
                <small className="text-muted text-decoration-line-through">
                  {item.original}
                </small>
                <span className="badge bg-orange ms-2">
                  {item.discount} OFF
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FlashSale;
