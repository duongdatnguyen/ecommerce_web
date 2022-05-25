const express=require("express");
const router=express.Router();
const statisticsController =require("../../../controllers/statistics/statisticsController");

router.get("/",async(req,res)=>statisticsController.sortOrderByTime(req,res));

module.exports=router;


