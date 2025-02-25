import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { createPayment } from '../controllers/razorpayController.js';
const Router = express();

Router.post('/',authenticate,createPayment);

export default Router;