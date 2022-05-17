const express=require("express");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");
const router=express.Router();
const saleController=require("../../../controllers/product/Sale");

router.post("/",async(req,res)=>saleController.createSale(req,res));
router.put("/:saleId",async(req,res)=>saleController.updateSale(req,res));
router.get("/:saleId",async(req,res)=>saleController.getByID(req,res));
router.delete("/:saleId",async(req,res)=>saleController.deleteSaleByID(req,res));
router.get("/",async(req,res)=>saleController.getAllSale(req,res));

router.get("/checkvalid/:saleId",async(req,res)=>saleController.checkValidSale(req,res));
module.exports=router;  