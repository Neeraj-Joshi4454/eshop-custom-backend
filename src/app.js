import express from 'express';
import dotenv from 'dotenv';
import connectionToDb from './config/conn.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import razorpayRoutes from './routes/razorpayRoutes.js';
import setupSwagger from './swagger.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));
app.use(express.json());
setupSwagger(app);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/razorpay', razorpayRoutes);

connectionToDb();

const port = process.env.PORT || 8000;
const host = process.env.HOST || '127.0.0.1';

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
