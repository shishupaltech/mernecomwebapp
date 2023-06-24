const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
exports.newOrder= catchAsyncErrors(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        TotalPrice,

    }=req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        TotalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        succes:true,
        order,
    })
});

// Get Single Order 
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("order is not found with this Id",404));

    }
    res.status(200).json({
        succes:true,
        order,
    })
})

// get logged in user Order 
exports.myOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})

    
    res.status(200).json({
        succes:true,
        orders,
    })
})
// get all Orders --Admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find()

    let totalAmount =0;
    orders.forEach(order=>{
        totalAmount+= order.TotalPrice;
    });


    
    res.status(200).json({
        succes:true,
        totalAmount,
        orders,
    })
})

// update Order Status --admin 

exports.updateOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }
    if(order.orderStatus==="Delevered"){
        return next(new ErrorHandler("you have already delivered this order",400));
    }

    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);
    });

    order.orderStatus = req.body.status;
    if(req.body.status==="Delivered"){

        order.deliveredAt = Date.now()
    }
    await order.save({
        validateBeforeSave:false,
    })
    res.status(200).json({
        succes:true,

    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock -=quantity;
    await product.save({validateBeforeSave:false})
};

// delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }
    order.deleteOne();

    


    
    res.status(200).json({
        succes:true,
        
    })
})