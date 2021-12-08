const express=require("express");
const { route } = require("../userRouter");
const router=express.Router();
const auth = require("../../../midleware/auth");
const Order = require("../../../models/Order");
const AppError=require("../../../models/AppError");
const Users = require("../../../models/Users");
const ItemOrder = require("../../../models/ItemOrder");
const secureAPi = require("../../../midleware/secureAPi");
const paypal=require("../../../services/payment");
const sendEmail=require("../../../services/sendMail");
const Product = require("../../../models/Product");

router.get("/",auth,async(req,res)=>{
    const orders=await Order.find({"userId":req.user.id}).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});
    if(orders.length===0)
    {
        return res.status(400).json(orders).json(new AppError("No Order is pending"));
    }
    return res.status(200).json(orders);
});


router.post("/",auth,async(req,res)=>{
    const userOrder=await Users.findById(req.body.userId);
    if(!userOrder)
    {
        return res.status(400).json(new AppError("User havem't exist"));
    }
    const items=req.body.items;
    if(items.length===0)
    {
        return res.status(400).json(new AppError("No item order"));
    }
    let itemIds=[];
        for(let i=0;i<items.length;i++)
        {
            const itemAdd=new ItemOrder(items[i]);
            const product= await Product.findById(items[i].productId);
            if(product.quantity<items[i].quantity)
            {
                return res.status(400).json(new AppError(`Product id ${items[i].productId} out of stock `));
            }
            product.quantity=product.quantity-items[i].quantity;
            await product.save();
            await itemAdd.save();
            itemIds.unshift(itemAdd._id);
        }
    const orderAdd=new Order();
    orderAdd.userId=req.body.userId;
    orderAdd.totalPrice=req.body.totalPrice;
    orderAdd.items.unshift(...itemIds);
    orderAdd.addressrecevie=req.body.addressrecevie;
    orderAdd.address=req.body.address;
    await orderAdd.save();
    const message={ // thiết lập đối tượng, nội dung gửi mail
        from: 'Ecomerce web',
        to: userOrder.email,
        subject: 'Order success',
        text: "You recieved message from",
        html: `<p>you have order complete. Please waiting admin check order. Your order have total price ${orderAdd.totalPrice} <p>`
    }
    sendEmail(message);
    // console.log(message);
    return res.status(200).json(orderAdd);
});

/**
 * Update items in order
 * 
 * Update items in order. Udpate total price
 */

router.put("/:orderId",auth,async(req,res)=>{
    const orderId=req.params.orderId;
    const orderUpdate=await Order.findById(orderId);
    if(!orderUpdate)
        {
            return res.status(400).json(new AppError("Order is not exist"));
        }
    let itemIds=[];
    const items=req.body.items;
    for(let i=0;i<items.length;i++)
    {
        const itemAdd= await ItemOrder.findById(items[i]._id);
        console.log(items[i].quantity)
        itemAdd.quantity=items[i].quantity;
        itemAdd.totalPrice=items[i].totalPrice;
        await itemAdd.save();
    }
    orderUpdate.totalPrice=req.body.totalPrice;
    await orderUpdate.save();
    const order=await Order.findById(orderUpdate._id).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});
    return res.status(200).json(order);
})





router.delete("/:orderId",auth,async(req,res)=>{
        const orderId=req.params.orderId;
        const orderDelete=await Order.findById(orderId);
        if(!orderDelete)
        {
            return res.status(400).json(new AppError("Order is not exist"));
        }
        await Order.findByIdAndUpdate(orderId,({$set:{status:req.body.status}}));
        const orderResult=await Order.findById(req.params.orderId);
        return res.status(200).json(orderResult);
});

router.get("/getById/:OrderId",async(req,res)=>{
    let query=Order.findById(req.params.OrderId).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const orders=await query;
    res.status(200).json(orders);
})

router.get("/search",async(req,res)=>{
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);  
    let query=Order.find(JSON.parse(queryStr)).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const orders=await query;
    res.status(200).json(orders);
})

router.get("/paging",async(req,res)=>{
    let page=req.query.page*1||1;
    let limit =req.query.limit;
    let skip=(page-1)*limit;
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);
    //const subcategoryId=req.query.subcategoryId;
    let query=Order.find(JSON.parse(queryStr)).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});
    query=query.skip(parseInt(skip)).limit(parseInt(limit));
    


    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
    if(req.query.page)
    {
        const numUsers=await Order.countDocuments();
        if(skip>numUsers)
        {
            res.status(400).json({error:[{"msg":"This page is not exist"}]});
        }

    }
    const ordercompletes=await query;
    res.status(200).json(ordercompletes);
})



module.exports=router;