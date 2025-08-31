import { useEffect, useState } from "react";
import { useApi } from "../service/api";

export default function PurchaseHistory() {
  const api = useApi();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    api.get("/purchases").then(res => setPurchases(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>My Purchases</h2>
      {purchases.length === 0 && <p>No purchases yet.</p>}
      <ul>
        {purchases.map(p => (
          <li key={p._id}>
            {p.date.slice(0,10)} | {p.deliveryTime} | {p.deliveryLocation} | {p.productName} x {p.quantity} | {p.message || "-"}
          </li>
        ))}
      </ul>
    </div>
  );
}
