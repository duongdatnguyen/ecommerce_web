const express=require("express");
const router=express.Router();
const DashboardController =require("../../../controllers/dashboard/dashboardController");


router.get("/",async(req,res)=>DashboardController.getTopFiveProductBestSell(req,res));

module.exports=router;  