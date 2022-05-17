const schedule = require('node-schedule');

const Sale =require("../models/Sale");
const saleController=require("../controllers/product/Sale");
const Coupon=require("../models/Coupons");
const CouponsController=require("../controllers/coupons/couponController");
const jobCheckSale = schedule.scheduleJob('30 5 23 * * *', async function(){

  // const sales= await Sale.find();

  // for (sale of sales)
  // {
  //   saleController.scheduleJobCheckValid(sale._id);
  // }
    const coupons= await Coupon.find();

  for (coupon of coupons)
  {
    CouponsController.scheduleJobCheckValid(coupon._id);
  }
});

module.exports=jobCheckSale;
