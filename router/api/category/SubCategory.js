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
        //const category=await Category.findOne({"nameCategory":req.body.nameCategory});
        const category=await Category.findById(req.body.categoryID);
        if(subCategoryExist)
        {
            return res.status(400).json(new AppError("Subcategory have exist"));
        }
        const subCategory=new SubCategory(req.body);
        subCategory.categoryID=category._id;
        await subCategory.save(async(error,result)=>{
            if(error)
            {
                return res.status(400).json(new AppError(error));
            }
            category.subcategories.unshift(result);
            await category.save();
            //return res.status(200).json(result);
        });
        const result=await SubCategory.findById(subCategory._id).populate("categoryID");
        return res.status(200).json(result);
        
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
        const subcateogoryId=req.params.subcateogoryId;


        const SubcategoryExist=await SubCategory.findById(subcateogoryId);
    
        if(!SubcategoryExist)
        {
            return res.status(400).json(new AppError("Sub Category haven't exist"));
        }
        

        const categoryOld=await Category.findById(SubcategoryExist.categoryID);
    
        if(categoryOld.id==req.body.categoryID)
        {
            SubcategoryExist.namesubCategory=req.body.namesubCategory;
            SubcategoryExist.substatus=req.body.substatus;
            await SubcategoryExist.save();
            //return res.status(200).json(SubcategoryExist);
        }
           
        else
        {
            SubcategoryExist.namesubCategory=req.body.namesubCategory;
            SubcategoryExist.categoryID=req.body.categoryID;
            SubcategoryExist.substatus=req.body.substatus;
            const categoryNew=await Category.findById(req.body.categoryID);

            categoryNew.subcategories.unshift(SubcategoryExist.id);
            
            await categoryNew.save();
            let removeIndex;
            removeIndex=categoryOld.subcategories.map(item=>item.id).indexOf(req.params.addressid);
            // for(let i=0;i<categoryOld.subcategories.length;i++)
            // {
            //     if(categoryOld.subcategories[i].id== SubcategoryExist.id)
            //     {
            //         console.log(categoryOld.subcategories.length);
                   
            //         removeIndex=i;
                    
            //     }
            // }
            console.log(removeIndex);
            if(removeIndex!=undefined)
            {
                categoryOld.subcategories.splice(removeIndex,1);
            }
            
            await categoryOld.save();
            await SubcategoryExist.save();

            const result=await SubCategory.findById(SubcategoryExist._id).populate("categoryID");

            //return res.status(200).json(result);
        }
        const result=await SubCategory.findById(SubcategoryExist._id).populate("categoryID");
        return res.status(200).json(result);
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
       
        const subcateogries=await SubCategory.find({status:true}).populate("categoryID").sort({date:1});
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