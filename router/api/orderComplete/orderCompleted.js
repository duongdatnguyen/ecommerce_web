const express=require("express");
const AppError = require("../../../models/AppError");
const Order = require("../../../models/Order");
const OrderCompleted = require("../../../models/OrderCompleted");
const router=express.Router();



router.post("/",async(req,res)=>{
    const ordercompletedExist=await OrderCompleted.findOne({orderId:req.body.orderId});
    if(ordercompletedExist)
    {
        return res.status(400).json(new AppError("Order have exist"));
    }
    const orderAdd=new OrderCompleted(req.body);
    await Order.findByIdAndUpdate(req.body.orderId,{ $set: { status: 'Done'}});
    await orderAdd.save();
    const orderCompleteResult=await OrderCompleted.findOne({orderId:req.body.orderId}).populate({path:"orderId",populate: { path: "userId", select: ["fistname", "lastname","email"]
                                                                                                    ,path:"items", select:["productId","quantity","totalPrice"],populate: { path: "productId", select: ["name", "price"]  }}});
    return res.status(200).json({orderComplete:orderCompleteResult});
});
//populate: { path: "productId", select: ["name", "price"]
router.get("/getOrder/:id",async(req,res)=>{
    const ordercompletedExist=await OrderCompleted.findById(req.params.id).populate({path:"orderId",populate: { path: "userId", select: ["fistname", "lastname","email"]
                                                                                    ,path:"items", select:["productId","quantity","totalPrice"],populate: { path: "productId", select: ["name", "price"]  }}});
    if(!ordercompletedExist)
    {
        res.status(400).json(new AppError("Order haven't exist"));
    }
    res.status(200).json(ordercompletedExist);
});


/**
 * 
 * PUT status
 */
router.put("/status/:id",async(req,res)=>{
    const ordercompletedExist=await OrderCompleted.findById(req.params.id);
    console.log(ordercompletedExist);
    if(!ordercompletedExist)
    {
        res.status(400).json(new AppError("Order haven't exist"));
    }
    ordercompletedExist.status=req.body.status;
    await ordercompletedExist.save();
    //const orderResult=await OrderCompleted.findByIdAndUpdate((req.params.id,{ $set: { status: req.body.status}}));
    res.status(200).json(ordercompletedExist);
});


router.get("/paging",async(req,res)=>{
    let page=req.query.page*1||1;
    let limit =req.query.limit;
    let skip=(page-1)*limit;

    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);

    

    //const subcategoryId=req.query.subcategoryId;
    let query=OrderCompleted.find(JSON.parse(queryStr)).populate("orderId");
    query=query.skip(parseInt(skip)).limit(parseInt(limit)).populate({path:"orderId",populate: { path: "userId", select: ["fistname", "lastname","email"]
                                                                        ,path:"items", select:["productId","quantity","totalPrice"],populate: { path: "productId", select: ["name", "price"]  }}});
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
    if(req.query.page)
    {
        const numUsers=await OrderCompleted.countDocuments();
        if(skip>numUsers)
        {
            res.status(400).json({error:[{"msg":"This page is not exist"}]});
        }

    }
    const ordercompletes=await query;
    res.status(200).json(ordercompletes);
})

router.get("/search",async(req,res)=>{
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);
    console.log(queryStr);
    let query=OrderCompleted.find(JSON.parse(queryStr)).populate({path:"orderId",populate: { path: "userId", select: ["fistname", "lastname","email"]
                                                                ,path:"items", select:["productId","quantity","totalPrice"],populate: { path: "productId", select: ["name", "price"]  }}});
    //let query=OrderCompleted.find()
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const orders=await query;
    res.status(200).json(orders);
});

module.exports=router;