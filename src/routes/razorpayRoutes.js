import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { createPayment, verifyPayment } from '../controllers/razorpayController.js';
const Router = express();

Router.post('/',authenticate,createPayment);
Router.post('/verify',authenticate,verifyPayment);

export default Router;