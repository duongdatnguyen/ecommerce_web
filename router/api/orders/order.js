const express=require("express");
const { route } = require("../userRouter");
const router=express.Router();
const auth = require("../../../midleware/auth");
const Order = require("../../../models/Order");
const AppError=require("../../../models/AppError");
const Users = require("../../../models/Users");
const ItemOrder = require("../../../models/ItemOrder");
const secureAPi = require("../../../midleware/secureAPi");

router.get("/",auth,async(req,res)=>{
    const orders=await Order.find({"userId":req.user.id,"status":"Pending"}).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }});
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
    console.log(items);
        for(let i=0;i<items.length;i++)
        {
            console.log(items[i]);
            const itemAdd=new ItemOrder(items[i]);
            await itemAdd.save();
            itemIds.unshift(itemAdd._id);
        }
    const orderAdd=new Order();
    orderAdd.userId=req.body.userId;
    orderAdd.totalPrice=req.body.totalPrice;
    orderAdd.items.unshift(...itemIds);
    orderAdd.addressrecevie=JSON.stringify(req.body.addressrecevie);
    await orderAdd.save();
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
        itemAdd.quantity=items[i].quantity;
        itemAdd.totalPrice=items[i].totalPrice;
        await itemAdd.save();
    }
    orderUpdate.totalPrice=req.body.totalPrice;
    await orderUpdate.save();
    const order=await Order.findById(orderUpdate._id).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }});
    return res.status(200).json(order);
})



router.delete("/:orderId",auth,secureAPi,async(req,res)=>{
        const orderId=req.params.orderId;
        const orderDelete=await Order.findById(orderId);
        if(!orderDelete)
        {
            return res.status(400).json(new AppError("Order is not exist"));
        }
        Order.findByIdAndUpdate(orderId,({$set:{status:req.body.status}}),(error,result)=>{
                if(error)
                {
                    console.log(error);
                }
                return res.status(200).json(result);
        });
});

router.get("/search",async(req,res)=>{
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);  
    let query=Order.find(JSON.parse(queryStr)).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }});
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const orders=await query;
    res.status(200).json(orders);
})


module.exports=router;