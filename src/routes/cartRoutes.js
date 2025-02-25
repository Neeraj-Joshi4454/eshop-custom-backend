import express from "express";
import {
  addItemToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartControllers.js";
import authenticate from "../middleware/authMiddleware.js";

const Router = express();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       500:
 *         description: Server error.
 */
Router.get("/", authenticate, getCartItems);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user.
 *               productId:
 *                 type: string
 *                 description: ID of the product.
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product.
 *     responses:
 *       201:
 *         description: Item added to the cart successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       500:
 *         description: Server error.
 */
Router.post("/", authenticate, addItemToCart);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update a cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Updated quantity.
 *     responses:
 *       200:
 *         description: Cart item updated successfully.
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Server error.
 */
Router.put("/:id", authenticate, updateCartItem);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart.
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Server error.
 */
Router.delete("/:id", authenticate, deleteCartItem);

export default Router;
