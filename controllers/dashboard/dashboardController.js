const OrderComplete =require("../../models/OrderCompleted");
const User= require("../../models/Users");
const Order =require("../../models/Order");
const ItemOrder =require("../../models/ItemOrder");

class DashboardController 
{
    async getTotalUserInSystem()
    {
        return await User.countDocuments({"status" :true, 'role':"user"});
    }
    async getTotalOrderByDay()
    {
        return await Order.countDocuments({"status":"Pending"});

    }

    async getTotalOrderCompleteByDay()
    {
        return await OrderComplete.countDocuments();
    }

    async getTopFiveProductBestSell(req,res)
    {
        let listProduct =await ItemOrder.aggregate([
        {
                $group: 
            {   _id: "$productId"
            ,
            productId:{ "$first": "$productId" },
            totalQuantity:{$sum:"$quantity" }
            
          }
        },
        {
            $lookup:
            {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'product'
              }
        },
        {
            $limit:5
            
        }
        ]);
        console.log(listProduct);
        return res.status(200).json({listProduct});
    }



}

module.exports=new DashboardController;