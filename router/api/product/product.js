const express=require("express");
const router=express.Router();
const validationProduct = require("../../../midleware/validationProduct");
const Product = require("../../../models/Product");

const AppError = require("../../../models/AppError");
const multer=require("../../../services/multer");
const cloudinary=require("../../../services/cloudinary");
//Paging product to display
router.get("/paging",async(req,res)=>{
    let page=req.query.page*1||1;
    let limit =req.query.limit;
    let skip=(page-1)*limit;
    const subcategoryId=req.query.subcategoryId;
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);


    let query=Product.find({"status":true}).populate('subcategoryId');
    //Sort by brand by Category
    query=query.find(JSON.parse(queryStr));
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
    
    if(subcategoryId)
    {
        query.where("subcategoryId").equals(subcategoryId);
    }
    query=query.skip(parseInt(skip)).limit(parseInt(limit));
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
    

    const uploadCloud=async (path) => await cloudinary.uploads(path,"Images");
    const productUpdate= await Product.findById(req.params.productId);
    if(!productUpdate)
        {
            return res.status(400).json(new AppError("Product does not exist!!!"));
        }
    const newPath=await uploadCloud(req.file.path);
    console.log(req.file.path);
    productUpdate.images=newPath.url;
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
router.put("/:productId",validationProduct.checkValidationUdpate,async(req,res)=>{
            const productUpdate= await Product.findById(req.params.productId);
            
            if(!productUpdate)
            {
                res.status(400).json(new AppError("Product haven't exist!!!"));
            }
            const {name,orgin,material,description,price}=req.body;
            await Product.findByIdAndUpdate(req.params.productId,{$set:{
                                                                                "name": name,
                                                                                "orgin": orgin,
                                                                                "material": material,
                                                                                "description":  description,
                                                                                "price": price 
                                                                            }});
            const productResult= await Product.findById(req.params.productId);
            res.status(200).json(productResult);
            

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
    const result =Product.findByIdAndUpdate(req.params.idProduct,{ $set: { status: false }},(error,result)=>{
        if(error)
        {
            console.log(error)
            res.status(400).json(new AppError(error));
        }
        res.status(200).json(result);
    });
       
});

router.get("/",async(req,res)=>{
    const queryObj={...req.query};
    
    let queryStr=JSON.stringify(queryObj);  
    let query=Product.find(JSON.parse(queryStr)).populate("subcategoryId");
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const products=await query;
    res.status(200).json(products);
})


module.exports=router;
