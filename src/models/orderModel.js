import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    status: { type: String, enum: ["Paid", "Failed"], default: "Paid" },
    items: [{ productId: String, quantity: Number }],
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "INR" }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
