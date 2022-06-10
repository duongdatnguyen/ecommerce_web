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
    async getTotalOrderByDay(time)
    {
        let listOrder=await  Order.find({"createdAt":{$gt:time}});

        let count=listOrder.filter(item=>item.status== "Pending");
         return count.length;

    }

    async getTotalOrderCompleteByDay(time)
    {
        
        let listOrderComplete=await OrderComplete.find({"createdAt":{$gt:time}});
        let count=listOrderComplete.filter(item=>item.status== "Done");
         return count.length;
    }

    async getTotalOrderWaitingShipping()
    {
        
        let listOrderComplete=await OrderComplete.find({"status":"Waitting"});
         return listOrderComplete.length;
    }

    async countDashboard(req,res)
    {   

         const timeNow=new Date();
        // const dateBefore=new Date(timeNow.setHours(0,0,0));
        const dateBefore = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), 0, 0, 0, 0);

        //const dateBefore = new Date(2022, 5, 4, 0, 0, 0, 0);
        //const dateBefore=new Date(d.setHours(0,0,0));

        const orderCompeleWaitingShipCount= await this.getTotalOrderCompleteByDay(dateBefore);
        console.log(orderCompeleWaitingShipCount);


        const userCount=await this.getTotalUserInSystem();

        const orderCount= await this.getTotalOrderByDay(dateBefore);

        const countOrderShipping= await this.getTotalOrderWaitingShipping();


        let objectResponse={};
        objectResponse.totalUser=userCount;
        objectResponse.totalOrderByDay=orderCount;
        objectResponse.getTotalOrderCompleteDay= orderCompeleWaitingShipCount;
        objectResponse.getTotalOrderWaitingShipping=countOrderShipping;


        res.status(200).json(objectResponse);

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
            '$unwind': {
              'path': '$product'
            }
          },
        {
            $limit:6
            
        }
        ]);
        listProduct=listProduct.filter(item =>item._id !=null);
        console.log(listProduct);
        return res.status(200).json({listProduct});
    }

    async getLatestOrder(req,res)
    {
        const orderlatest= await Order.find().sort({"createdAt":-1}).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});

        return res.status(200).json({"orderlist":orderlatest});
    }



}

module.exports=new DashboardController;