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
const orderController=require("../../../controllers/order/orderController");

const paymentVNPay=require("../../../services/paymentVNPay");

router.get("/",auth,async(req,res)=>{
    const orders=await Order.find({"userId":req.user.id}).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]}).sort({"createdAt": -1 });
    if(orders.length===0)
    {
        return res.status(400).json(orders).json(new AppError("No Order is pending"));
    }
    return res.status(200).json(orders);
});


router.post("/",auth,async(req,res)=>orderController.addItemtoOrder(req,res));


router.get("/search/condition",async(req,res)=>orderController.getByStatus(req,res));

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
        const orderResult=await Order.findById(req.params.orderId).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }});
        if(req.body.status =="Cancel")
        {
        await orderController.addQuantityProductAgain(orderResult);
        }
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


    query=query.sort({"createdAt": -1 });
    // if(req.query.sort)
    // {
    //   const sortType=req.query.sort;
    //   console.log(sortType);
    //     query=query.sort({sortType: -1 });

    // }
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
});







router.get("/payment/vnPay/:orderId",async(req,res,next)=>{
  console.log(req.params.orderId);
    const order= await Order.findById(req.params.orderId);
    console.log(order);
    const url = paymentVNPay.createVNPayMethod(null, "pay", req, order);

    await Order.updateOne(
        { _id: req.params.orderId },
        {
          $set: {
            paymentId: url.paymentId,
          },
        }
      );
      console.log(url);
      return res.redirect(url.vnpUrl);
    //return res.send({ vnpUrl: url.vnpUrl });
});

router.get('/payment/vnpay_return', async (req, res, next) => {
  var vnp_Params = req.query;


  
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  //vnp_Params = sortObject(vnp_Params);
  vnp_Params = paymentVNPay.sortObject(vnp_Params);
  // var config = require('config');
  var tmnCode = process.env.VNP_TMNCODE;
  var secretKey = process.env.VNP_HASHSECRET;

  // var tmnCode = config.get('vnp_TmnCode');
  // var secretKey = config.get('vnp_HashSecret');
 
  var querystring = require("qs");
  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  var sha256 = require("sha256");

  var checkSum = sha256(signData);

  if(secureHash === checkSum){
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    const orderId=vnp_Params["vnp_OrderInfo"];
    const order= await Order.findById(orderId);
    const paymentId=vnp_Params["vnp_TxnRef"];
    order.paymentMethod="VnPay";
    order.isPaypal=true;
    order.paymentId=paymentId;

    await order.save();
    const redirect=process.env.URL_SYSTEM+"order";
    return res.redirect(redirect);
      //return res.status(200).json({ RspCode: "00", Message: "success" });
  } else{
    return res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
});

router.get("/payment/vnpay_ipn", async (req, res) => {
    // try {
      var vnp_Params = req.query;
      var secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = paymentVNPay.sortObject(vnp_Params);
      var secretKey = process.env.VNP_HASHSECRET;
      var querystring = require("qs");
      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

      var sha256 = require("sha256");

      var checkSum = sha256(signData);

      if (secureHash === checkSum) {
        var paymentId = vnp_Params["vnp_TxnRef"];
        console.log(paymentId);
        var rspCode = vnp_Params["vnp_ResponseCode"];
        if (rspCode === "00") {

          return res.status(200).json({ RspCode: "00", Message: "success" });
        }
        return res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
      } else {
        return res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
      }
    // } catch (error) {
    //   return res.status(200).json({ RspCode: "97", Message: error.message });
    // }
  });




module.exports=router;