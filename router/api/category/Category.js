const express=require("express");
const AppError = require("../../../models/AppError");
const Category = require("../../../models/Category");

const SubCategory=require("../../../models/SubCategory");
const router=express.Router();




/**
 * Add New Category
 * 
 * 
 */
router.post("/",async(req,res)=>{
    try
    {

        const nameCategory=req.body.nameCategory;


        const categoryExist= await Category.find({nameCategory:nameCategory});
        if(categoryExist.length===1)
        {
            return res.status(400).json(new AppError("Category have exist"));
        }
    
        const newCategory=new Category(req.body);
    
        await newCategory.save();
        return res.status(200).json(newCategory);
    }
    catch(error)
    {
        console.log(error);

        res.status(404).json(new AppError(error));
    }
    

});

/**
 * Update Category
 * 
 */

router.put("/:cateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.cateogoryId;


        const categoryExist=await Category.findById(categoryId);
    
        if(!categoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }
        categoryExist.nameCategory=req.body.nameCategory;
        categoryExist.status=req.body.status;
        await categoryExist.save();

        res.status(200).json(categoryExist);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError(error));
    }
    
});
/**
 * Get One
 */

/**
 * 
 * 
 * Get All category
 */

 router.get("/",async(req,res)=>{
    try
    {
       
        const cateogries=await Category.find().sort({datecreated:1});
        res.status(200).json(cateogries);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError(error));
    }
    
});

/**
 * Sort
 */
 router.get("/:cateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.cateogoryId;


        const categoryExist=await Category.findById(categoryId).populate("subcategories");
    
        if(!categoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }

        res.json(categoryExist);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError(error));
    }
    
});


/**
 * 
 * 
 */
 router.delete("/:cateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.cateogoryId;


        const categoryExist=await Category.findById(categoryId).populate("subcategories");
        console.log(categoryId);
        if(!categoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }
         categoryExist.status=false;
         await categoryExist.save();

        res.json(categoryExist);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError("Can't delete category"));
    }
    
});




router.put("/activate/:cateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.cateogoryId;


        const categoryExist=await Category.findById(categoryId);
        console.log(categoryId);
        if(!categoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }
         categoryExist.status=true;
         await categoryExist.save();

        res.json(categoryExist);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError("Can't activate category"));
    }
    
});

/**
 * 
 * 
 * Get SubCategory
 */

router.get("/name/:name",async(req,res)=>{
    try
    {
        const categoryfind=await Category.find({nameCategory:req.params.name}).populate("subcategories");
        if(!categoryfind)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }

        res.status(200).json(categoryfind);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError(error));
    }
    
});

router.get("/pagingcategory/paging",async(req,res)=>{
    let page=req.query.page*1||1;
    let limit =req.query.limit;
    let skip=(page-1)*limit;
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);
    //const subcategoryId=req.query.subcategoryId;
    let query=Category.find(JSON.parse(queryStr));
    query=query.skip(parseInt(skip)).limit(parseInt(limit)).populate("subcategories");
    


    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
    if(req.query.page)
    {
        const numUsers=await Category.countDocuments();
        if(skip>numUsers)
        {
            res.status(400).json({error:[{"msg":"This page is not exist"}]});
        }

    }
    const ordercompletes=await query;
    res.status(200).json(ordercompletes);
})

module.exports=router;