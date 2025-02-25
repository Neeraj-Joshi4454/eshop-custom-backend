import Cart from '../models/cartModel.js';

export const getCartItems = async(req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ success: false, error: "User not authenticated" });
        }

        const cart = await Cart.findOne({ userId }).populate("items.productId");

        return res.status(200).json({
            success: true,
            data: cart || { userId, items: [] },
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const addItemToCart = async (req, res) => {
    try{
        const {userId, productId, quantity} = req.body;
        if(!userId || !productId || !quantity){
            return res.status(400).json({success: false, error:"Missing required fields."});
        }

        let cart = await Cart.findOne({userId});

        if(!cart){
            cart = new Cart({userId, items:[{productId, quantity}]})
        }else{
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            }
            else{
                cart.items.push({productId, quantity});
            }
        }
        await cart.save();
        return res.status(201).json({success: true, data: cart})
    }catch(error){
        return res.status(500).json({success: false, error:error.message})
    }
}

export const updateCartItem = async (req, res) => {
    try{
        const id = req.params.id;
        const {quantity} = req.body;
        
        const cart = await Cart.findOneAndUpdate(
            {"items._id": id},
            {$set:{"items.$.quantity":quantity}},
            {new:true}
        )


        if(!cart){
            return res.status(404).json({success:false, error:"Cart item not found."})
        }

        return res.status(200).json({success:true, data: cart});
    }catch(error){
        return res.status(500).json({success: false, error:error.message});
    }
}

export const deleteCartItem = async (req, res) => {
    try{
        const id = req.params.id;
        const cart = await Cart.findOneAndUpdate(
            {"items._id": id},
            {$pull: {items: {_id:id}}},
            {new : true}
        )

        if(!cart){
            return res.status(404).json({success:false, error: "Cart item not found"})
        }

        return res.status(200).json({success : true, message : "Item removed from cart"})
    }catch(error){
        return res.status(500).json({success: false, error:error.message})
    }
}