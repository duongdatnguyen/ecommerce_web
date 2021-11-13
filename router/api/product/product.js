const express=require("express");
const validationProduct = require("../../../midleware/validationProduct");
const Product = require("../../../models/Product");
const router=express.Router();
const AppError = require("../../../models/AppError");
const multer=require("../../../services/multer");

//Paging product to display
router.get("/paging",async(req,res)=>{
    const page=req.query.page*1||1;
    const limit =req.query.limit;
    const skip=(page-1)*limit;
    const subcategoryId=req.query.subcategoryId;
    let query=Product.find().populate('subcategoryId');
    //Sort by brand by Category
    if(subcategoryId)
    {
        query.where("subcategoryId").equals(subcategoryId);
    }

    query=query.skip(skip).limit(limit);
    if(req.query.page)
    {
        const numUsers=await Product.countDocuments();
        if(skip>numUsers)
        {
            res.status(400).json({error:[{"msg":"This page is not exist"}]});
        }

    }
    const products=await query;
    res.status(200).json(products);
})


//Update Iamge 

router.post("/images/:productId",multer.single("photo"),async(req,res)=>{
    
    const productUpdate= await Product.findById(req.params.productId);
    if(!productUpdate)
        {
            return res.status(400).json(new AppError("Product does not exist!!!"));
        }
    productUpdate.images=req.file.path;
    await productUpdate.save();
    return res.status(200).json(productUpdate);
})

//Add product 
router.post("/",validationProduct.checkvaliadtionProduct,async(req,res)=>{
    try{
        const productExist=await Product.findOne({name:req.body.name});
        if(productExist)
        {
            return res.status(400).json(new AppError("Product have exist!!!"));
        }
        const proudctAdd= new Product(req.body);

        await proudctAdd.save();
        return  res.status(200).json(proudctAdd);
    }
    catch(error)
    {
        return res.status(400).json(new AppError(error));
    }
})


//Update Product
router.put("/:productId",async(req,res)=>{
            const productUpdate= await Product.findById(req.params.productId);
            if(!productUpdate)
            {
                res.status(400).json(new AppError("Product haven't exist!!!"));
            }
            const productChange=new Product(req.body);

            const result=await Product.updateOne(productUpdate,productChange);
            res.status(200).json(result);

});

//Get product
router.get('/:idProduct',async(req,res)=>{
        const product =await Product.findById(req.params.idProduct).populate('subcategoryId');
        if(!product)
        {
           return res.status(400).json(new AppError("Product haven't exist"));
        }
       return res.status(200).json(product);
});

//Delete product 

router.delete('/:idProduct',async(req,res)=>{
    const product =await Product.findById(req.params.idProduct).populate('subcategoryId');
        if(!product)
        {
            res.status(400).json(new AppError("Product haven't exist"));
        }
    const result =Product.findByIdAndUpdate(req.params.idProduct,{ $set: { status: false }},(result,error)=>{
        if(error)
        {
            res.status(400).json(new AppError(error));
        }
        req.status(200).json(result);
    });
       
})


module.exports=router;
