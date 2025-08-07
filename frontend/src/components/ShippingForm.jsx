import { useState } from "react";

const ShippingForm = () => {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  return (
    <div className="mb-4">
      <h5 className="fw-bold">📦 Shipping Details</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        type="tel"
        className="form-control mb-2"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
    </div>
  );
};

export default ShippingForm;
