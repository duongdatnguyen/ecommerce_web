
const express=require("express");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");
const router=express.Router();
const sizeController=require("../../../controllers/product/Size");

router.post("/",async(req,res)=>sizeController.createSize(req,res));

router.put("/:sizeID",async(req,res)=>sizeController.updateSize(req,res));

router.get("/",async(req,res)=>sizeController.getSize(req,res));

router.get("/:sizeID",async(req,res)=>sizeController.updateSize(req,res));

router.get("/product/:productId",async(req,res)=>sizeController.getSizeByProductId(req,res));

module.exports=router;