const CartSummary = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mb-4">
      <h5 className="fw-bold">🛍️ Cart Summary</h5>
      {items.map((item, idx) => (
        <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-2">
          <div className="d-flex align-items-center gap-3">
            <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
            <div>
              <strong>{item.name}</strong>
              <div className="text-muted small">Qty: {item.quantity}</div>
            </div>
          </div>
          <div className="fw-bold">Rs.{item.price * item.quantity}</div>
        </div>
      ))}
      <div className="text-end mt-3 fw-bold fs-5">Total: Rs.{total}</div>
    </div>
  );
};

export default CartSummary;
