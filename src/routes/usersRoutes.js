
import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/userController.js';

const Router = express();

Router.get('/',authenticate, getAllUsers)

export default Router;