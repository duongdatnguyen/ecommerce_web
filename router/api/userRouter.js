const {Sercet_token}=require("../../config/default");
const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const validatonUser=require("../../midleware/validationUser");
const User=require("../../models/Users");
const { body } = require("express-validator");
const auth = require("../../midleware/auth");
const passport = require("passport");
const AppError = require("../../models/AppError");
const secureApi=require("../../midleware/secureAPi");


//api/users
/*
 * Register User
 * 
 */
router.post("/",validatonUser.checkValidUser,async(req,res)=>{


    const {fistname,lastname,email,gender,password,phonenumber}=req.body;
    try{
        const user= await User.findOne({email:email});
        if(!user)
        {
            const salt=await bcrypt.genSalt(10);
            let passwordhashed=await bcrypt.hash(password,salt);

            const useradd=new User({fistname,lastname,email,gender,password,phonenumber});
            useradd.password=passwordhashed;
            
            await useradd.save();

            const payload={
                user:{
                    id:useradd.id,
                }
            }

            //Change return in here
            jwt.sign(payload,Sercet_token,{expiresIn:3600},async(error,token)=>{
                if(error) throw error;
                const userfind= await User.findOne({email:email});
                res.json({jwt:token,user:userfind});
            })
        }
        else
        {
            res.status(400).json({error:[{"msg":"User have exist"}]});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:[{"msg":"Server errors"}]});
    }
    
});

/**Parmater page, limit
 * 
 * 
 * 
 */



router.get("/paging",async(req,res)=>{
    const page=req.query.page*1||1;
    const limit =req.query.limit;
    const skip=(page-1)*limit;
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);
    let query=User.find(JSON.parse(queryStr)).select("-password");
    query=query.skip(parseInt(skip)).limit(parseInt(limit));
    if(req.query.page)
    {
        const numUsers=await User.countDocuments();
        if(skip>numUsers)
        {
            res.status(400).json({error:[{"msg":"This page is not exist"}]});
        }

    }
    const users=await query;
    res.json(users);
})

/**
 * 
 * Sort buy gender
 */
router.get("/getbyId/:idUser",async(req,res)=>{

    const userFind=await User.findById(req.params.idUser).select("-password");
    if(!userFind)
    {
        res.status(400).json({error:[{"msg":"User have exist"}]});

    }
    
   
    res.status(200).json(userFind);

})



router.put("/updatewithAdmin/:userId",auth,async(req,res)=>{
    const {fistname,lastname,role,status,date,month,gender,phonenumber}=req.body;
    try{
        const user= await User.findById(req.params.userId);
        if(!user)
        {
            res.status(400).json({error:[{"msg":"User doesn't exist"}]});
        }
        const result=await User.findByIdAndUpdate(req.params.userId,{$set:{"fistname":fistname,
                                                                        "lastname":lastname,
                                                                        "gender":gender,
                                                                        "role":role,
                                                                        "status":status,
                                                                        "date":date,
                                                                        "month":month,
                                                                        "phonenumber":phonenumber}});
        const userResult= await User.findById(req.params.userId);
        res.status(200).json(userResult);

    }
    catch(error)
    {
        res.status(400).json(new AppError(error));
    }
})


/**Delete user but will have protect
 * No update email. Phone number can update but I have some features about sms token 
 * 
 */
router.delete("/admin/:userid",async(req,res)=>{
    const userdelete=await User.findById(req.params.userid);
    if(!userdelete)
    {
        res.status(400).json(new AppError("User is null"));
    }
        await User.findByIdAndUpdate(req.params.userid,{$set:{status:false}});
        const result=await User.findById(req.params.userid);
        res.status(200).json(result);
})

/**
 * Update user
 * 
 * 
 */
// router.put("/update1",auth,async(req,res)=>{
//     res.json({msg:"Completed"})
// })
router.put("/update",auth,validatonUser.checkValidUser,async(req,res)=>{
    const {fistname,lastname,email,password,gender,phonenumber}=req.body;
    try{
        const user= await User.findById(req.user.id);
        if(!user)
        {
            res.status(400).json({error:[{"msg":"User doesn't exist"}]});
        }
        const result=await User.findByIdAndUpdate(req.user.id,{$set:{"fistname":fistname,
                                                                        "lastname":lastname,
                                                                        "gender":gender,
                                                                        "phonenumber":phonenumber}});
        const userResult= await User.findById(req.user.id);
        res.status(200).json(userResult);

    }
    catch(error){
        console.log(error)
        res.status(400).json({error:[{"msg":error}]});
    }
    
})


router.put("/update/password",auth,async(req,res)=>{
    const passwordOld=req.body.passwordOld;
    const passwordNew=req.body.passwordNew;
    try{
        const user=await User.findById(req.user.id);
        let isMatch=await bcrypt.compare(passwordOld,user.password);
        if(!isMatch)
        {
            return res.status(400).json({error:[{msg:'Password incorrect'}]});
        }

        //Password New
        const salt=await bcrypt.genSalt(10);
        let passwordhashed=await bcrypt.hash(passwordNew,salt);
        user.password=passwordhashed;
        await user.save();

            const payload={
                user:{
                    id:user.id,
                }
            }

            //Change return in here
            jwt.sign(payload,Sercet_token,{expiresIn:3600},async(error,token)=>{
                if(error) throw error;
                const userfind= await User.findById(req.user.id);
                res.status(200).json({jwt:token,user:userfind});
            })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(new AppError(error));
    }
})

router.put("/role",auth,async(req,res)=>{
    const role=req.body.role;
    try{
        console.log(role);
        const user= await User.findById(req.user.id);
        if(!user)
        {
            res.status(400).json({error:[{"msg":"User doesn't exist"}]});
        }
        const result=await User.findByIdAndUpdate(req.user.id,{$set:{role:role}});

        res.status(200).json(result);

    }
    catch(error){
        console.log(error)
        res.status(400).json({error:[{"msg":error}]});
    }
})


router.get("/search",async(req,res)=>{
    const queryObj={...req.query};
    let queryStr=JSON.stringify(queryObj);  
    let query=User.find(JSON.parse(queryStr));
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
   
    const users=await query;
    res.status(200).json( users);
})


router.post("/admin/register",auth,async(req,res)=>{


    const {fistname,lastname,email,gender,password,phonenumber,role}=req.body;
    try{
        const user= await User.findOne({email:email});
        if(!user)
        {
            const salt=await bcrypt.genSalt(10);
            let passwordhashed=await bcrypt.hash(password,salt);

            const useradd=new User({fistname,lastname,email,gender,password,phonenumber,role});
            useradd.password=passwordhashed;
            await useradd.save();
            const payload={
                user:{
                    id:useradd.id,
                }
            }

            //Change return in here
            jwt.sign(payload,Sercet_token,{expiresIn:3600},async(error,token)=>{
                if(error) throw error;
                const userfind= await User.findOne({email:email});
                res.json({jwt:token,user:userfind});
            })
        }
        else
        {
            res.status(400).json({error:[{"msg":"User have exist"}]});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:[{"msg":"Server errors"}]});
    }
    
});


module.exports=router;

