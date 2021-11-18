const express=require("express");
const validationSubCategory = require("../../../midleware/validationSubCategory");
const AppError = require("../../../models/AppError");
const Category = require("../../../models/Category");
const SubCategory=require("../../../models/SubCategory");
const router=express.Router();
const multer=require("../../../services/multer");
const cloudinary=require("../../../services/cloudinary");
/**
 * Add New Category
 * 
 * 
 */
 router.post("/",validationSubCategory.checkValidSubCategory,async(req,res)=>{
    try
    {
        const subCategoryExist=await SubCategory.findOne({"namesubCategory":req.body.namesubCategory});
        const category=await Category.findOne({"nameCategory":req.body.nameCategory});
        if(subCategoryExist)
        {
            return res.status(400).json(new AppError("Subcategory have exist"));
        }
        const subCategory=new SubCategory(req.body);
        //subCategory.categoryID=category._id;
        await subCategory.save(async(error,result)=>{
            if(error)
            {
                return res.status(400).json(new AppError(error));
            }
            category.subcategories.unshift(result);
            await category.save();
            return res.status(200).json(result);
        });
        
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

router.put("/:subcateogoryId",async(req,res)=>{
    try
    {
        const categoryId=req.params.subcateogoryId;


        const SubcategoryExist=await SubCategory.findById(subcateogoryId);
    
        if(!SubcategoryExist)
        {
            return res.status(400).json(new AppError("Sub Category haven't exist"));
        }
        SubcategoryExist.nameSubCategory=req.body.nameSubCategory;

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
 router.get("/:subcateogoryId",async(req,res)=>{
    try
    {
        const subcateogoryId=req.params.subcateogoryId;


        const SubcategoryExist=await SubCategory.findById(subcateogoryId).populate("categoryID");
    
        if(!SubcategoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }

        res.status(200).json(SubcategoryExist);
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
 router.delete("/:subcateogoryId",async(req,res)=>{
    try
    {
        const SubcategoryId=req.params.subcateogoryId;


        const SubcategoryExist=await SubCategory.findById(SubcategoryId);
        if(!SubcategoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }
        SubcategoryExist.substatus=false;
         await SubcategoryExist.save();

        res.status(200).json(SubcategoryExist);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError("Can't delete category"));
    }
    
});

router.put("/activate/:subcateogoryId",async(req,res)=>{
    try
    {
        const subcategoryId=req.params.subcateogoryId;


        const subcategoryExist=await SubCategory.findById(subcategoryId);
        console.log(subcategoryId);
        if(!subcategoryExist)
        {
            return res.status(400).json(new AppError("Category haven't exist"));
        }
         subcategoryExist.substatus=true;
         await subcategoryExist.save();

        res.status(200).json(subcategoryExist);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError("Can't activate category"));
    }
    
});


router.get("/",async(req,res)=>{
    try
    {
       
        const subcateogries=await SubCategory.find({status:true}).sort({date:1});
        res.status(200).json(subcateogries);
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json(new AppError(error));
    }
    
});

/**
 * Images
 */
 router.post("/images/:subcategoryId",multer.single("photo"),async(req,res)=>{
    

    const uploadCloud=async (path) => await cloudinary.uploads(path,"Images");
    const subcategoryUpdate= await SubCategory.findById(req.params.subcategoryId);
    if(!subcategoryUpdate)
        {
            return res.status(400).json(new AppError("SubCategory does not exist!!!"));
        }
    const newPath=await uploadCloud(req.file.path);
    subcategoryUpdate.icon=newPath.url;
    await subcategoryUpdate.save();
    return res.status(200).json(subcategoryUpdate);
})

module.exports=router;