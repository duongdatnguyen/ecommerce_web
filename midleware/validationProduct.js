const {check,validationResult, body}=require('express-validator');


class ValidationProduct
{
        async checkvaliadtionProduct (req,res,next)
        {
            await check('name').isLength({ min: 1 }).withMessage("Please enter name product")
            .run(req);
            await check('orgin').isLength({ min: 1 }).withMessage("Please enter orgin")
            .run(req);
            await check('material').isLength({ min: 1 }).withMessage("Please enter material")
            .run(req);
            await check('description').isLength({ min: 1 }).withMessage("Please enter description")
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
          const {categoryId,brandId,name,orgin,material,description,price,status}=req.body;
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
          if(categoryId)
          {
              productUpdate.save=categoryId;
          }
        }
}

module.exports=new ValidationProduct;