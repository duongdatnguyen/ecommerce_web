const {check,validationResult, body}=require('express-validator');
const AppError = require('../models/AppError');
const Users = require('../models/Users');
class validationSubCategory
{
    
    
    async checkValidOrder(req,res,next)
    {
        
        const user=await Users.find({"_id":req.body.userId,"status":true});
        if(!user)
        { 
            return res.status(400).json(new AppError("User haven't exist"));
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