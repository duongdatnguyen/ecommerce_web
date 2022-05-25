const Order =require("../../models/Order");

const OrderCompleted =require ("../../models/OrderCompleted");






class StatisticsController
{

    async sortOrderByTime(req,res)
    {
//Convert yyyy-mm-dd;
        let orderCompleteList=[];
        let startDate=new Date(req.query.startDate);
        let enddate=new Date(req.query.endDate);
        
        let startDate_number=startDate.getTime();
        let enddate_number=enddate.getTime();
        const ordercompletes =await OrderCompleted.find({"status":"Done"}).populate({path:"orderId",populate: {
                                path:"items", select:["productId","quantity","totalPrice"]
                                ,populate: { path: "productId", select: ["name", "price"]
                                
                            }}
                        }).populate({path:"orderId",populate: {
                            path: "userId", select: ["fistname", "lastname","email"]}});;
        for( let ordercomplete of ordercompletes)
        {
            let dateCheck= ordercomplete.createdAt.getTime();
            if(dateCheck>=startDate_number &&  dateCheck<=enddate_number)
            {
                orderCompleteList.push(ordercomplete);
            }
            
        }
        res.status(200).json({"listOrder":orderCompleteList});
    }

    

    async getProductTurnover(req,res)
    {
        
    }

}



module.exports=new StatisticsController;