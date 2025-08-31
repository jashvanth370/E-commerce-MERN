import { useState } from "react";
import { useApi } from "../service/api";

const districts = ["Colombo", "Gampaha", "Kandy", "Galle"]; // example
const products = ["Laptop", "Phone", "Headphones"]; // example

export default function PurchaseForm({ onSuccess }) {
  const api = useApi();

  const [form, setForm] = useState({
    date: "",
    deliveryTime: "10AM",
    deliveryLocation: districts[0],
    productName: products[0],
    quantity: 1,
    message: ""
  });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/purchases", form);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const todayStr = new Date().toISOString().split("T")[0]; // min date

  return (
    <form onSubmit={handleSubmit}>
      <label>Date: <input type="date" name="date" value={form.date} onChange={handleChange} min={todayStr} required /></label>
      <label>Time: 
        <select name="deliveryTime" value={form.deliveryTime} onChange={handleChange}>
          {["10AM","11AM","12PM"].map(t => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label>Location:
        <select name="deliveryLocation" value={form.deliveryLocation} onChange={handleChange}>
          {districts.map(d => <option key={d}>{d}</option>)}
        </select>
      </label>
      <label>Product:
        <select name="productName" value={form.productName} onChange={handleChange}>
          {products.map(p => <option key={p}>{p}</option>)}
        </select>
      </label>
      <label>Quantity: <input type="number" name="quantity" min="1" value={form.quantity} onChange={handleChange} required /></label>
      <label>Message: <input type="text" name="message" value={form.message} onChange={handleChange} /></label>
      <button type="submit">Purchase</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </form>
  );
}
