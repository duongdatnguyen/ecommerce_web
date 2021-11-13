const AppError = require("../models/AppError");
const Users = require("../models/Users");



module.exports=async function protect(req,res,next)
{
    try{
        const roleuser=await Users.findById(req.user.id).select('role');
        if(roleuser.role!='admin')
        {
            return  res.json(new AppError("User can't access this api"));
        }
        next();
    }
    catch(error)
    {
        console.log(error);
        return res.json({error:[{"msg":error}]});
    }
}