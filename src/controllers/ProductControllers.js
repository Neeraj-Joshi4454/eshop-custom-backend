import { DeleteObjectCommand, S3, S3Client } from '@aws-sdk/client-s3';
import Product from '../models/productModel.js';
import { s3 } from '../storage/index.js';

export const createProduct = async (req, res) => {
    try{
        const {name, description, price,category} = req.body;
        if(!req.file) return res.status(400).json({error: "Image is required"})
        const imageUrl = req.file.location;
        const newProduct = new Product({name , description, price, category, image:imageUrl})
        await newProduct.save();
        res.json({success:true, message : "Product Added Successfully", product : newProduct});
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const count = await Product.countDocuments();

        return res.status(200).json({
            success: true,
            count,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


export const getSingleProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({success:false, message : "Product not found."})
        return res.status(200).json({success: true, product});
    }catch(error){
        return res.status(500).json({success: false, error:error.message});
    }
}

export const updateProduct = async (req, res) => {
    try{
        const {name , description , price, category} = req.body;
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({success: false , message : "Product not found"})

        if(req.file){
            product.image = req.file.location;
        }

        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.category = category || product.category

        await product.save();
        res.status(200).json({success : true, message : "Product Updated Successfully."})
    }catch(error){
        return res.status(500).json({success: false , error:error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message : "Product not found."})
        
        const key = product.image.split('.amazonaws.com/')[1];
        await s3.send(new DeleteObjectCommand({Bucket: process.env.S3_BUCKET_NAME, Key: key}));

        await Product.deleteOne();
        res.status(200).json({success: true, message : "Product Deleted Successfully."})
    }catch(error){
        return res.status(500).json({success: false , error:error.message})
    }
}