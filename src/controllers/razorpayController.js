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

        // return res.status(201).json({ success: true, order});
        return res.status(201).json({ 
            success: true, 
            orderId: order.id, 
            amount: order.amount, 
            currency: order.currency 
          });
    }catch(error){
        return res.status(500).json({success:false, error:error.message})
    }
}

