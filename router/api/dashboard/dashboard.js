const express=require("express");
const router=express.Router();
const DashboardController =require("../../../controllers/dashboard/dashboardController");


router.get("/fiveproduct",async(req,res)=>DashboardController.getTopFiveProductBestSell(req,res));


router.get("/latestorder",async(req,res)=>DashboardController.getLatestOrder(req,res));

module.exports=router;  