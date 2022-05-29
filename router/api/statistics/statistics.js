const express=require("express");
const router=express.Router();
const statisticsController =require("../../../controllers/statistics/statisticsController");

router.get("/",async(req,res)=>statisticsController.sortOrderByTime(req,res));


router.get("/products",async(req,res)=>statisticsController.getProductTurnover(req,res));
router.get("/products/time",async(req,res)=>statisticsController.getStaticsProductSale(req,res));
module.exports=router;


