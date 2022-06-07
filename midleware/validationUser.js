const {check,validationResult, body}=require('express-validator');

class ValidationUser
{
    
    
    async checkValidUser(req,res,next)
    {
     
        await check('fistname').isLength({ min: 1 }).withMessage("FistName customer is require")
        .run(req);
        await check('lastname').isLength({ min: 1 }).withMessage("Last Name customer is require")
        .run(req);
        await check('email').isEmail().isLength({ min: 1 }).withMessage("Please enter email")
        .run(req);
        await check('password').isLength({ min: 6 })
        .withMessage('must be at least 5 chart long')
        .run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
          console.log(result);
          return res.status(400).json({ errors: result.array() });
        }
      
        next();
    }
    async checkValidAddress(req,res,next)
    {
      // await check('city').isLength({ min: 1 }).withMessage("Please enter city")
      // .run(req);
      // await check('district').isLength({ min: 1 }).withMessage("Please enter district")
      // .run(req);
      // await check('ward').isLength({ min: 1 }).withMessage("Please enter district")
      // .run(req);
      // const result = validationResult(req);
      //   if (!result.isEmpty()) {
      //     console.log(result);
      //     return res.status(400).json({ errors: result.array() });
      //   }
        next();
    }
}

module.exports=new ValidationUser();