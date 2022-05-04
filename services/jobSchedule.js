const schedule = require('node-schedule');

const Sale =require("../models/Sale");
const saleController=require("../controllers/product/Sale");

const jobCheckSale = schedule.scheduleJob('30 5 23 * * *', async function(){

  const sales= await Sale.find();

  for (sale of sales)
  {
    saleController.scheduleJobCheckValid(sale._id);
  }
});

module.exports=jobCheckSale;
