const Product=require("../../models/Product");
const Sale=require("../../models/Sale");
const Coupon=require("../../models/Coupons");

class CouponsController
{
    async createCoupons(req,res)
    {
        
        //const {nameVouncher,description,discountPercent,statusCoupon,dateStart,datEnd,priceOrderLimit}=req.body;


        const coupon=new Coupon(req.body);
        
        await coupon.save()
        .then(coupon=>
        {
            res.status(200).json({"messsage":"Add coupon success",coupon:coupon})
            
        })
        .catch(error=>res.status(400).json({"messsage":"Add coupon failed","error":error}));
        console.log("abc")
    }
    async updateCoupon(req,res)
    {

        const couponId=req.params.couponId;
        const {nameVouncher,description,discountPercent,statusCoupon,dateStart,datEnd,priceOrderLimit}=req.body;

        const coupon=await Coupon.findById(couponId);
       
        if(nameVouncher !=null)
        {
            coupon.nameVouncher=nameVouncher;
        }
        if(description !=null)
        {
            coupon.description=description;
        }
        if(discountPercent !=null)
        {
            coupon.discountPercent=discountPercent;
        }
        if(dateStart !=null)
        {
            coupon.dateStart=dateStart;
        }
        if(datEnd !=null)
        {
            coupon.dateEnd=dateStart;
        }
        if(priceOrderLimit !=null)
        {
            coupon.priceOrderLimit=priceOrderLimit;
        }

        await coupon.save()
        .then(coupon=>res.status(200).json({"messsage":"Add sale success","coupon":coupon}))
        .catch(error=>res.status(400).json({"messsage":"Update sale failed","error":error}));

    }

    async getByID(req,res)
    {
        
        const couponId=req.params.couponId;

        const coupon=await Coupon.findById(couponId);
        if(!coupon)
        {
            res.status(400).json({"messsage":"Coupon is null"});
        }

        res.status(200).json(coupon);
        
    }
    async getAllCoupon(req,res)
    {
        
        

        const coupons=await Coupon.find();
        if(!coupons)
        {
            res.status(400).json({"messsage":"Coupons is null"});
        }

        res.status(200).json(coupons);
        
    }
    
    async deleteCouponByID(req,res)
    {
        const couponId=req.params.couponId;

        const coupon=await Coupon.findById(couponId);
        if(!coupon)
        {
            res.status(400).json({"messsage":"Coupon is null"});
        }

        Coupon.findByIdAndDelete(couponId)
        .then(()=>res.status(200).json({"messsage":"Delete success"}))            
        .catch(error=>res.status(400).json({"messsage":"Delete failed", "error":error}));

    }

    async checkValidCoupons(req,res)
    {
        const couponId=req.params.couponId;
        const coupon=await Coupon.findById(couponId);
        if(!coupon)
        {
            res.status(400).messsage({"message":"Coupon is undenfind ","status":false});
        }
        const dateStart=coupon.dateStart;
        
        const dateEnd=coupon.dateEnd;

        const dateStart_Date =new  Date(dateStart.year,dateStart.month-1,dateStart.day,dateStart.hour,dateStart.minute,dateStart.second,0);

        const dateStart_Number=dateStart_Date.getTime();
        const dateEnd_Date =new  Date(dateEnd.year,dateEnd.month-1,dateEnd.day,dateEnd.hour,dateEnd.minute,dateEnd.second);

        const dateEnd_Number=dateEnd_Date.getTime();

        const dateCurrent = Date.now();

        console.log(dateCurrent);
        console.log(dateStart_Number);
        console.log(dateEnd_Number);
        if(dateCurrent>=dateStart_Number&& dateCurrent<=dateEnd_Number)
        {
            
            res.status(200).json({"message":"Sale have valid ","status":true});
        }
        else
        {
            res.status(400).json({"message":"Sale has expired ","status":false});
        }
    }

    async scheduleJobCheckValid(_id)
    {
        const coupon=await Coupon.findById(_id);
        
        const dateStart=coupon.dateStart;
        
        const dateEnd=coupon.dateEnd;

        const dateStart_Date =new  Date(dateStart.year,dateStart.month-1,dateStart.day,dateStart.hour,dateStart.minute,dateStart.second,0);

        const dateStart_Number=dateStart_Date.getTime();
        const dateEnd_Date =new  Date(dateEnd.year,dateEnd.month-1,dateEnd.day,dateEnd.hour,dateEnd.minute,dateEnd.second);
        const dateEnd_Number=dateEnd_Date.getTime();

        const dateCurrent = Date.now();

        if(dateCurrent>=dateStart_Number&& dateCurrent<=dateEnd_Number)
        {
            return true;
        }
        else
        {
            await Coupon.findByIdAndDelete(_id);

            return false;
        }
    }

    // async applySale(_id,quantity)
    // {
    //     const sale=await Sale.findById(_id);
    //     console.log(sale);
    //     let quantityDiscount=sale.quantityDiscount;
    //     let checkValid =this.scheduleJobCheckValid(_id);
    //     if(quantity<sale.quantityDiscount && checkValid)
    //     {
    //         sale.quantityDiscount=quantityDiscount -quantity;
    //         await sale.save();
    //         return true;
    //     }
    //     return false;
    // }

}

module.exports=new CouponsController;