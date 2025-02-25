import Razorpay from 'razorpay';
import Order from "../models/orderModel.js";
import crypto from 'crypto';

export const createPayment = async (req, res) => {
    try{
        const {amount} = req.body;
        if(!amount || amount < 1){
            return res.status(400).json({success:false , error: 'Invalid Amount'})
        }
        const razorpay = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });


        const order = await razorpay.orders.create({
            amount : amount * 100,
            currency: "INR",
            receipt : `order_rcptid_${Date.now()}`,
        });
        console.log(order);
      
        if(!order) return res.status(400).json({success:false, error: "Failed to create order."})

        return res.status(201).json({ success: true, order});
    }catch(error){
        return res.status(500).json({success:false, error:error.message})
    }
}



export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // Generate HMAC SHA256 hash
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, error: "Invalid signature" });
        }

        // ✅ Save Order in MongoDB
        const order = await Order.create({
            userId: req.user.id, // Assuming user is authenticated
            razorpay_order_id,
            razorpay_payment_id,
            status: "Paid",
            items: req.body.items,  // Add ordered items
            amount: req.body.amount,
            currency: "INR"
        });

        return res.status(200).json({ success: true, message: "Payment verified", order });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};
