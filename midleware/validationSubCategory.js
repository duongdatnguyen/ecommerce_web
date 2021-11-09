const {check,validationResult, body}=require('express-validator');
const AppError = require('../models/AppError');
const Category=require("../models/Category");
class validationSubCategory
{
    
    
    async checkValidSubCategory(req,res,next)
    {
        const categoryExist=await Category.find({"nameCategory":req.body.nameCategory});
        if(!categoryExist)
        { 
            return res.status(400).json(new AppError("Category haven't exist"));
        }
        await check('namesubCategory').isLength({ min: 1 }).withMessage("FistName customer is require")
        .run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
          console.log(result);
          return res.status(400).json({ errors: result.array() });
        }
      
        next();
    }
    
}

module.exports=new validationSubCategory();