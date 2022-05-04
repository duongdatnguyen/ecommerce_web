const Product=require("../../models/Product");
const Sale=require("../../models/Sale");
const { single } = require("../../services/multer");


class SaleController
{
    async createSale(req,res)
    {
        
        const {productId,percentSale,nameSale,description,statusSale,dateStart,datEnd}=req.body;

        

        const product=await Product.findById(productId);
        if(!product)
        {
            res.status(400).json({"messsage":"Product is null"});
        }

        const saleAdd=new Sale(req.body);
        
        await saleAdd.save()
        .then(sale=>async function()
        {
            
            
        })
        .catch(error=>res.status(400).json({"messsage":"Add sale failed","error":error}));
        product.saleId=saleAdd._id;
        await product.save()
        .then(product=>res.status(200).json({"messsage":"Add sale success"}))
        .catch(error=>res.status(400).json({"messsage":"Add sale failed","error":error}));;
        
                
    }
    async updateSale(req,res)
    {
        try
        {
        const saleId=req.params.saleId;
        const {productId, nameSale, description, statusSale, dateStart, datEnd,quantityDiscount,percentSale }=req.body;

        const sale=await Sale.findById(saleId);
       
        if(nameSale !=null)
        {
            sale.nameSale=nameSale;
        }
        if(description !=null)
        {
            sale.description=description;
        }
        if(statusSale !=null)
        {
            sale.statusSale=statusSale;
        }
        if(dateStart !=null)
        {
            sale.dateStart=dateStart;
        }
        if(datEnd !=null)
        {
            sale.dateEnd=dateStart;
        }
        if(quantityDiscount !=null)
        {
            sale.quantityDiscount=quantityDiscount;
        }
        if(percentSale !=null)
        {
            sale.percentSale=percentSale;
        }


        await sale.save();
        res.status(200).json({"messsage":"Add sale success","save":sale});
    }
        catch(error)
        {
            console.log(error);
            res.status(400).json({"messsage":"Update sale failed"});
        }
        
    }

    async getByID(req,res)
    {
        
        const saleId=req.params.saleId;

        const sale=await Sale.findById(saleId).populate("productId");
        if(!sale)
        {
            res.status(400).json({"messsage":"Sale is null"});
        }

        res.status(200).json(sale);
        
    }
    async getAllSale(req,res)
    {
        
        

        const sales=await Sale.find();
        if(!sales)
        {
            res.status(400).json({"messsage":"Sale is null"});
        }

        res.status(200).json(sales);
        
    }
    
    async deleteSaleByID(req,res)
    {
        const saleId=req.params.saleId;

        const sale=await Sale.findById(saleId).populate("productId");
        if(!sale)
        {
            res.status(400).json({"messsage":"Sale is null"});
        }
        const product=await Product.findById(sale.productId);
        if(!product)
        {
            res.status(400).json({"messsage":"Product is null"});
        }
        Sale.findByIdAndDelete(saleId)
        .then()            
        .catch(error=>res.status(400).json({"messsage":"Delete failed"}));

        product.saleId=null;
        await product.save().then(product=>res.status(200).json({"messsage":"Delete success"}))
        .catch(error=>res.status(400).json({"messsage":"Delete failed"}));
    }

    async checkValidSale(req,res)
    {
        const sale=await Sale.findById(req.params.saleId);
        if(!sale)
        {
            res.status(400).messsage({"message":"Sale is undenfind ","status":false});
        }
        const dateStart=sale.dateStart;
        
        const dateEnd=sale.dateEnd;

        const dateStart_Date =new  Date(dateStart.year,dateStart.month-1,dateStart.day,dateStart.hour,dateStart.minute,dateStart.second,0);

        const dateStart_Number=dateStart_Date.getTime();
        const dateEnd_Date =new  Date(dateEnd.year,dateEnd.month-1,dateEnd.day,dateEnd.hour,dateEnd.minute,dateEnd.second);

        const dateEnd_Number=dateEnd_Date.getTime();

        const dateCurrent = Date.now();

        if(dateCurrent>=dateStart_Number&& dateCurrent<=dateEnd_Number)
        {
            if(sale.quantityDiscount<=0)
            {
                res.status(400).json({"message":"The number of discounted products has expired ","status":false});
            }
            else
            {
                res.status(200).json({"message":"Sale have valid ","status":true});
            }
        }
        else
        {
            res.status(400).json({"message":"Sale has expired ","status":false});
        }
    }

    async scheduleJobCheckValid(_id)
    {
        const sale=await Sale.findById(_id);
        
        const dateStart=sale.dateStart;
        
        const dateEnd=sale.dateEnd;
        console.log(dateEnd);

        const dateStart_Date =new  Date(dateStart.year,dateStart.month-1,dateStart.day,dateStart.hour,dateStart.minute,dateStart.second,0);

        const dateStart_Number=dateStart_Date.getTime();
        const dateEnd_Date =new  Date(dateEnd.year,dateEnd.month-1,dateEnd.day,dateEnd.hour,dateEnd.minute,dateEnd.second);
        const dateEnd_Number=dateEnd_Date.getTime();

        const dateCurrent = Date.now();

        if(dateCurrent>=dateStart_Number&& dateCurrent<=dateEnd_Number)
        {
            if(sale.quantityDiscount>=0)
            {
                return true;
            }
            else
            {
                sale.statusSale=false;
                await sale.save();
                return false;
            }
        }
        else
        {
            return false;
            console.log("Error");
        }
    }

    async applySale(_id,quantity)
    {
        const sale=await Sale.findById(_id);
        console.log(sale);
        let quantityDiscount=sale.quantityDiscount;
        let checkValid =this.scheduleJobCheckValid(_id);
        if(quantity<sale.quantityDiscount && checkValid)
        {
            sale.quantityDiscount=quantityDiscount -quantity;
            await sale.save();
            return true;
        }
        return false;
    }

}

module.exports=new SaleController;