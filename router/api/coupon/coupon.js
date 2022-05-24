const express=require("express");
const router=express.Router();
const CouponsController=require("../../../controllers/coupons/couponController");



router.post("/",async(req,res)=>CouponsController.createCoupons(req,res));
router.put("/:couponId",async(req,res)=>CouponsController.updateCoupon(req,res));
router.get("/:couponId",async(req,res)=>CouponsController.getByID(req,res));
router.delete("/:couponId",async(req,res)=>CouponsController.deleteCouponByID(req,res));
router.get("/",async(req,res)=>CouponsController.getAllCoupon(req,res));
router.get("/checkvalid/all",async(req,res)=>CouponsController.getAllCouponValid(req,res));
// router.get("/checkCoupons/:couponIdc",async(req,res)=>console.log("Test abc"));
router.get("/checkvalid/:couponId",async(req,res)=>CouponsController.checkValidCoupons(req,res));
module.exports=router;  