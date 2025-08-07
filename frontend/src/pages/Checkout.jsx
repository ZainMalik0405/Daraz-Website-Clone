import { useLocation } from "react-router-dom";
import CartSummary from "../components/CartSummary.jsx";
import ShippingForm from "../components/ShippingForm.jsx";
import PaymentOptions from "../components/PaymentOptions.jsx";
import OrderReview from "../components/OrderReview.jsx";

const user = JSON.parse(localStorage.getItem("user"));
const cartKey = `cart_${user?.id}`;
const location = useLocation();

const items = location.state?.items || JSON.parse(localStorage.getItem(cartKey)) || [];

const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);



const Checkout = () => {
  const { state } = useLocation();
  const items = state?.items || JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">🛒 Checkout</h2>
      <CartSummary items={items} />
      <ShippingForm />
      <PaymentOptions />
      <OrderReview items={items} />
    </div>
  );
};

export default Checkout;
