const OrderReview = ({ items }) => {
  const handlePlaceOrder = () => {
    alert("🎉 Order placed successfully!");
    localStorage.removeItem("cart");
  };

  return (
    <div className="text-end">
      <button className="btn btn-success fw-bold px-4" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default OrderReview;
