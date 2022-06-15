const ItemOrder = require("../../models/ItemOrder");
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
        let endDate_last_date=new Date(enddate.getFullYear(), enddate.getMonth(), enddate.getDate(), 23, 59, 59, 59);
        
        let totalTurnover=0;
        let startDate_number=startDate.getTime();
        let enddate_number=endDate_last_date.getTime();
        const ordercompletes =await OrderCompleted.find({"status":"Done"}).populate({path:"orderId",populate: {
                                path:"items", select:["productId","quantity","totalPrice"]
                                ,populate: { path: "productId", select: ["name", "price"]
                                
                            }}
                        }).populate({path:"orderId",populate: {
                            path: "userId", select: ["fistname", "lastname","email"]}});;
        for( let ordercomplete of ordercompletes)
        {
            let dateCheck= ordercomplete.createdAt.getTime();
            if(req.query.startDate == undefined  || req.query.endDate == undefined)
            {
              totalTurnover+=ordercomplete.totalPrice;
              orderCompleteList.push(ordercomplete);
            }
            else{
            if(dateCheck>=startDate_number &&  dateCheck<=enddate_number)
            {
                totalTurnover+=ordercomplete.totalPrice;
                orderCompleteList.push(ordercomplete);
            }
            
        }
      }
        res.status(200).json({"listOrder":orderCompleteList,"totalTurnover":totalTurnover});
    }

    
    // Doanh thu của product theo tháng
    async getProductTurnover(req,res)
    {
        let result=await ItemOrder.aggregate([
          {
            '$group': {
              '_id': '$_id', 
              'profit': {
                '$sum': '$totalPrice'
              }
            }
          }, {
            '$lookup': {
              'from': 'products', 
              'localField': '_id', 
              'foreignField': '_id', 
              'as': 'product'
            }
          }, {
            '$unwind': {
              'path': '$product'
            }
          }, {
            '$sort': {
              'profit': -1
            }
          }
        ]);
          res.status(200).json(result);
        
    }

    async getStaticsProductSale(req,res)
    {

        
        let result=await Order.aggregate(
            [
                {
                  '$unwind': {
                    'path': '$items'
                  }
                }, {
                  '$lookup': {
                    'from': 'items', 
                    'localField': 'items', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }, {
                  '$unwind': {
                    'path': '$result'
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'productId': '$result.productId', 
                    'quantity': '$result.quantity', 
                    'totalprice': '$result.totalPrice', 
                    'createdAt': '$createdAt', 
                    'updatedAt': '$updatedAt'
                  }
                }, {
                  '$lookup': {
                    'from': 'products', 
                    'localField': 'productId', 
                    'foreignField': '_id', 
                    'as': 'product'
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'productId': '$productId', 
                    'quantity': '$quantity', 
                    'totalprice': '$totalprice', 
                    'createdAt': '$createdAt', 
                    'updatedAt': '$updatedAt', 
                    'product': {
                      '$arrayElemAt': [
                        '$product', 0
                      ]
                    }
                  }
                }
              ]
        );


        let productStatisticList=[];
        let totalTurnover=0;
        if(req.query.startDate != undefined  && req.query.endDate != undefined)
        {
         
        let startDate=new Date(req.query.startDate);
        let enddate=new Date(req.query.endDate);
        let endDate_last_date=new Date(enddate.getFullYear(), enddate.getMonth(), enddate.getDate(), 23, 59, 59, 59);

        let startDate_number=startDate.getTime();
        let enddate_number=endDate_last_date.getTime();

        for( let statisticItem of result)
        {
            let dateCheck= statisticItem.createdAt.getTime();
            if(dateCheck>=startDate_number &&  dateCheck<=enddate_number)
            {
                productStatisticList.push(statisticItem);
            }
            
        }
      }
      else
      {
        productStatisticList.push(...result);
      }

        let productListCount=[];

        for( let product of productStatisticList)
        {
            if(productListCount.length==0)
            {
                product.totalQuantitySale=product.quantity;
                product.totalPriceSale=product.totalprice;

                productListCount.push(product);
            }
            else
            {
                let index=productListCount.findIndex(item => item.productId==product.productId);

                if(index < 0)
                {
                    product.totalQuantitySale=product.quantity;
                    product.totalPriceSale=product.totalprice;

                    productListCount.push(product);
                }
                else
                {
                    productListCount[index].totalQuantitySale+= product.quantity;
                    productListCount[index].totalPriceSale +=product.totalprice;
                }

               
            }
            totalTurnover=productListCount.reduce((acc,item) => acc+item.totalPriceSale,0);
        }
        


        res.status(200).json({"productList":productListCount,"totalTurnover":totalTurnover});
    }

}



module.exports=new StatisticsController;