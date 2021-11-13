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


            jwt.sign(payload,Sercet_token,{expiresIn:3600},(error,token)=>{
                if(error) throw error;
                res.json({token});
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
    let query=User.find().select("-password");
    query=query.skip(skip).limit(limit);
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
router.get("/",async(req,res)=>{
    const queryObj={...res.query};
    let queryStr=JSON.stringify(queryObj);



    let query=User.find(JSON.parse(queryStr)).select("-password");
    console.log(query);
    if(req.query.sort)
    {
        query=query.sort(req.query.sort);

    }
    
    const users=await query;
    res.json(users);

})




/**Delete user but will have protect
 * No update email. Phone number can update but I have some features about sms token 
 * 
 */
router.delete("/:userid",async(req,res)=>{
    const userdelete=await User.findById({id:req.body.userid});
    if(!userdelete)
    {
        User.findByIdAndUpdate(req.body.userid,{status:false},(error,user)=>{
            if(error) throw error;
            else
            {
                res.json({msg:"User have deleted"});
            }
        })
    }
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

        res.json(result);

    }
    catch(error){
        console.log(error)
        res.status(400).json({error:[{"msg":error}]});
    }
    
})

module.exports=router;

