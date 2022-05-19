const Size=require("../../models/Size");
const Color=require("../../models/Color");
const Product=require("../../models/Product");

class sizeController
{

    async createSize(req,res)
    {
            // let colors=req.colors;
            // for( let color of colors)
            // {
            //     let colorAdd= new Color(color);
            //     await colorAdd.save();
            // }
            let productId=req.body.productId;
            const product=await Product.findById(productId);
            console.log(productId);
            if(!product)
            {
                res.status(400).json({"messsage":"Product is null"});
            }

            let size=new Size(req.body);
            await size.save()
            .then()
            .catch(error=> res.status(400).json({"message":"Size create failed", "error":error}));

            product.size=size._id;
            await product.save().then(()=>res.status(200).json(size))
            .catch(error=> res.status(400).json({"message":"Size create failed", "error":error}));
            
    }
    async updateSize(req,res)
    {
        let size=await Size.findById(req.params.sizeID);
        if(!size)
        {
            res.status(400).json({"message":"Size is null"});
        }
        await Size.findByIdAndUpdate(req.params.sizeID,req.body);

        let sizeUpdate=await Size.findById(req.params.sizeID);
        res.status(200).json(sizeUpdate);
    }

    async getSize(req,res)
    {
        let allSize= await Size.find();

        res.status(200).json(allSize);
    }

    async getById(req,res)
    {
        let size= await Size.findById(req.params.sizeID);
        if(!size)
        {
            res.status(400).json({"messsage":"Size is null"});
        }
        res.status(200).json(size);
    }
    async updateQuantity()
    {
        
    }
    async getSizeByProductId(req,res)
    {
        let productList= await Size.find({"productId":req.params.productId});

        res.status(200).json(productList);
    }
}

module.exports=new sizeController;