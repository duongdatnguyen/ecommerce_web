const express=require("express");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");
const router=express.Router();
const ownerCouponsCotroller=require("../../../controllers/coupons/ownerCouponsController");



router.post("/",async(req,res)=>ownerCouponsCotroller.applyOwnerCoupons(req,res));
router.get("/users/:userId",async(req,res)=>ownerCouponsCotroller.getAllCouponsOfUser(req,res));
router.put("/applycoupons",async(req,res)=>ownerCouponsCotroller.getCouponsAndApply(req,res));
router.get("/:couponsId",async(req,res)=>ownerCouponsCotroller.getById(req,res));

module.exports=router;  