const express=require("express");
const router=express.Router();
const validationProduct = require("../../../midleware/validationProduct");
const Product = require("../../../models/Product");
// const updateMutiple=require("../../../services/multer");
const AppError = require("../../../models/AppError");
const multerService=require("../../../services/multer");
const multer=require("multer");
const cloudinary=require("../../../services/cloudinary");
//Paging product to display
router.get("/paging",async(req,res)=>{
    let page=req.query.page*1||1;
    let limit =req.query.limit;
    let skip=(page-1)*limit;
    const subcategoryId=req.query.subcategoryId;
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);


    let query=Product.find().populate('subcategoryId');
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname);
    }
  })
  router.post('/imagesMutiple/:productId', multerService.array('photo', 4), async(req, res, next)=> {
    const fileinfo = req.files;
    const title = req.body.title;
    //console.log(fileinfo);
    const productUpdate= await Product.findById(req.params.productId);
    const uploadCloud=async (path) => await cloudinary.uploads(path,"Images");
    if(!productUpdate)
        {
            return res.status(400).json(new AppError("Product does not exist!!!"));
        }

        productUpdate.images=[];
    for(file of fileinfo)
    {
        let newPath=await uploadCloud(file.path);
        //console.log(file);
        productUpdate.images.push(newPath.url);
    }
    await productUpdate.save();
    
    return res.status(200).json(productUpdate);
  })

//Update Iamge 

router.post("/images/:productId",multerService.single("photo"),async(req,res)=>{
    

    const uploadCloud=async (path) => await cloudinary.uploads(path,"Images");
    const productUpdate= await Product.findById(req.params.productId);
    if(!productUpdate)
        {
            return res.status(400).json(new AppError("Product does not exist!!!"));
        }
    const newPath=await uploadCloud(req.file.path);
    
    productUpdate.imageMain=newPath.url;
    await productUpdate.save();
    const product =await Product.findById(productUpdate.id).populate('subcategoryId').populate("size");
    return res.status(200).json(product);
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

        const product =await Product.findById(proudctAdd.id).populate('subcategoryId').populate("size");

        return  res.status(200).json(product);
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
            const {name,orgin,material,description,price,subcategoryId,status,content,quantity}=req.body;
            await Product.findByIdAndUpdate(req.params.productId,{$set:{
                                                                                "name": name,
                                                                                "orgin": orgin,
                                                                                "material": material,
                                                                                "description":  description,
                                                                                "price": price ,
                                                                                "subcategoryId":subcategoryId,
                                                                                "status":status,
                                                                                "content":content,
                                                                                "quantity":quantity
                                                                            }});
            const productResult= await Product.findById(req.params.productId).populate('subcategoryId').populate("size");
            res.status(200).json(productResult);
            

});

//Get product
router.get('/:idProduct',async(req,res)=>{
        const product =await Product.findById(req.params.idProduct).populate('subcategoryId').populate("size").populate("saleId");
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
        
    });

    const productResult= await Product.findById(req.params.idProduct).populate('subcategoryId').populate("size");
    res.status(200).json(productResult);
});

router.get("/",async(req,res)=>{
    const queryObj={...req.query};
    
    let queryStr=JSON.stringify(queryObj);  
    let query=Product.find(JSON.parse(queryStr)).populate("subcategoryId").populate("size");
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const products=await query;
    res.status(200).json(products);
})



router.get("/search/*",async(req,res)=>{
    const string_search=req.query.stringSearch;
    let products=null;
    let regex = new RegExp(string_search,'i');
    products= await Product.find({"name":regex})
    .populate("subcategoryId").populate("size");

    if(products==null)
        {
            res.status(400).json({"message":`Can't find product match this string ${string_search}`});
        }
    
    res.status(200).json(products);
});



router.get('/searchUI/byName',async(req,res)=>{
    const product =await Product.find().select("name");
    if(!product)
    {
       return res.status(400).json(new AppError("Product haven't exist"));
    }
   return res.status(200).json(product);
});

module.exports=router;
