import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  username: { type: String, required: true }, // from Auth0 token
  date: { type: Date, required: true },
  deliveryTime: { type: String, enum: ["10AM", "11AM", "12PM"], required: true },
  deliveryLocation: { type: String, required: true }, // district
  productName: { type: String, required: true },
  quantity: { type: Number, min: 1, required: true },
  message: { type: String, maxlength: 500 }
}, { timestamps: true });

export default mongoose.model("Purchase", PurchaseSchema);
