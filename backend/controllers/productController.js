const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product --admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});
// get all the product 
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    })
});
// GET PRODUCT DETAILS 
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    const productCount = await Product.countDocuments();
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product,
        productCount,
    })
});
// Update Product -- Admin 
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
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
});
// Delete product 
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    // remove() is deprecated by deleteOne() Or DeleteMany();
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    });
});

// Create the review and update the review if it is exist then old will be updated by new 
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating,comment,productId} = req.body
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev=>rev.user.toString()===req.user._id.toString())
            rev.rating=rating,
            rev.comment=comment
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
     product.reviews.forEach(rev=>{
        avg = avg+rev.rating
    })
    product.ratings =avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });
})

// Get All Reviews of a product 
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
});

// Delete Review 
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    const reviews = product.reviews.filter(rev=>rev._id.toString !== req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    const ratings = avg/reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,

    })
})