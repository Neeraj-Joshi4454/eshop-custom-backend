// import express from 'express';
// import dotenv from 'dotenv';
// import connectionToDb from './config/conn.js';
// import authRoutes from './routes/authRoutes.js'
// import productRoutes from './routes/productRoutes.js'
// import swaggerJSDoc from 'swagger-jsdoc';

// dotenv.config();
// const app = express();

// // middlewares
// app.use(express.json())

// swaggerJSDoc(app)
// // routes
// app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/product/',productRoutes)

// connectionToDb();

// const port = process.env.PORT || 8000;
// const host = process.env.HOST || '127.0.0.1';

// app.get('/', (req, res) => {
//     res.send('Welcome to the server')
// });

// app.listen(process.env.PORT, () => {
//     console.log(`server is running on http://${host}:${port}`)
// })

import express from 'express';
import dotenv from 'dotenv';
import connectionToDb from './config/conn.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import setupSwagger from './swagger.js';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
setupSwagger(app);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);

connectionToDb();

const port = process.env.PORT || 8000;
const host = process.env.HOST || '127.0.0.1';

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
