const express=require("express");
const AppError = require("../../../models/AppError");
const Category = require("../../../models/Category");
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
    
        if(categoryExist)
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

        await categoryExist.save();

        res.json(categoryExist);
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
 * Sort
 */
 router.get("/:cateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.cateogoryId;


        const categoryExist=await Category.findById(categoryId);
    
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

 router.get("/paging",async(req,res)=>{
    const page=req.query.page*1||1;
    const limit =req.query.limit;
    const skip=(page-1)*limit;
    let query=Category.find().select("-password").sort({datecreated:-1});
    query=query.skip(skip).limit(limit);
    if(req.query.page)
    {
        const numUsers=await Category.countDocuments();
        if(skip>numUsers)
        {
            res.status(400).json(new AppError("Can't paging category"));
        }

    }
    const categories=await query;
    res.json(categories);
})

/**
 * 
 * 
 */
 router.delete("/:cateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.cateogoryId;


        const categoryExist=await Category.findById(categoryId);
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


module.exports=router;