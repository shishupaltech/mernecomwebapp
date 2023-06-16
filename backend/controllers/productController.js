const Product = require("../models/productModel");


// Create Product --admin
exports.createProduct = async(req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

// get all the product 
exports.getAllProducts = async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}

// Update Product -- Admin 
exports.updateProduct = async(req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:true,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}