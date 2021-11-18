const {check,validationResult, body}=require('express-validator');
const Category =require("../models/Category");
const SubCategory=require("../models/SubCategory");
const AppError=require("../models/AppError");
class ValidationProduct
{
        async checkvaliadtionProduct (req,res,next)
        {
            console.log(req.body.subcategoryId);
            const subcateogryId=await SubCategory.findById(req.body.subcategoryId);

            if(!subcateogryId)
            {
                return res.status(400).json(new AppError("Subcategory undenfined"));
            }
            await check('name').isLength({ min: 1 }).withMessage("Please enter name product")
            .run(req);
            await check('orgin').isLength({ min: 1 }).withMessage("Please enter orgin")
            .run(req);
            await check('material').isLength({ min: 1 }).withMessage("Please enter material")
            .run(req);
            await check('description').isLength({ min: 1 }).withMessage("Please enter description")
            .run(req);
            await check('price').isLength({ min: 1 }).withMessage("Please enter description")
            .run(req);
            const result = validationResult(req);
              if (!result.isEmpty()) {
                console.log(result);
                return res.status(400).json({ errors: result.array() });
              }
              next();
        }

        async checkValidationUdpate(req,res,next)
        {
        //   const {name,orgin,material,description,price}=req.body;
          await check('name').isLength({ min: 1 }).withMessage("Please enter name product")
          .run(req);
          await check('orgin').isLength({ min: 1 }).withMessage("Please enter orgin")
          .run(req);
          await check('material').isLength({ min: 1 }).withMessage("Please enter material")
          .run(req);
          await check('description').isLength({ min: 1 }).withMessage("Please enter description")
          .run(req);
          await check('price').isLength({ min: 1 }).withMessage("Please enter description")
          .run(req);
          const result = validationResult(req);
            if (!result.isEmpty()) {
              console.log(result);
              return res.status(400).json({ errors: result.array() });
            }
            next();
        }
}

module.exports=new ValidationProduct;