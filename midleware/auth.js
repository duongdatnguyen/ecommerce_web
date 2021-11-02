const jwt=require("jsonwebtoken");
const {Sercet_token}=require("../config/default");
const Users = require("../models/Users");

module.exports=function(req,res,next)
{
    const token=req.header('x-auth-token');
    if(!token)
    {
        return res.json({error:[{"msg":"Token is null"}]});
    }
    try
    {
        const decoded= jwt.verify(token,Sercet_token);
        req.user=decoded.user;
        next();
    }
    catch(error)
    {
        console.log(error);
        return res.json({error:[{"msg":error}]});
    }
};

// module.exports=(...roles)=>async function protect(req,res,next)
// {
//     try{
//         const roleuser=await Users.findById(req.user.id).select('role');
//         if(!roles.includes(roleuser))
//         {
//             return  res.json({error:[{"msg":"User can't access this api"}]});
//         }
//         next();
//     }
//     catch(error)
//     {
//         console.log(error);
//         return res.json({error:[{"msg":error}]});
//     }
// }
