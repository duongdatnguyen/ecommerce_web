
const AppError = require("../../models/AppError");
const userService=require("../../services/users/userService");
const constantUser=require("../../contants/users/constantUser");
const User=require("../../models/Users");
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const {Sercet_token}=require("../../config/default");

class userController
{
    async createUserwithAdmin(req,res)
    {
        
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
            const appError=new AppError(constantUser.SUCCESS_MESSAGE,constantUser.SUCCESS_METHOD);
            //Change return in here
            jwt.sign(payload,Sercet_token,{expiresIn:3600},async(error,token)=>{
                if(error) throw error;
                const userfind= await User.findOne({email:email});
                
                res.status(appError.status).json({jwt:token,user:userfind,message:appError.message});
            })
        }
        else
        {
            const appError=new AppError(constantUser.FAILED_MESSAGE,constantUser.FAILED_METHOD);
            appError.message="User have exist";
            res.status(appError.status).json({message:appError.message});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:[{"msg":"Server errors"}]});
    }

    }

    async createUser(req,res)
    {
        const {fistname,lastname,email,gender,password,phonenumber}=req.body;
    try{
        const user= await User.findOne({email:email});
        if(!user)
        {
            const salt=await bcrypt.genSalt(10);
            let passwordhashed=await bcrypt.hash(password,salt);

            const useradd=new User({fistname,lastname,email,gender,password,phonenumber});
            useradd.password=passwordhashed;
            
            userService.createUser(useradd);

            const payload={
                user:{
                    id:useradd.id,
                }
            }
            const appError=new AppError(constantUser.SUCCESS_MESSAGE,constantUser.SUCCESS_METHOD);
            //Change return in here
            jwt.sign(payload,Sercet_token,{expiresIn:3600},async(error,token)=>{
                if(error) throw error;
                const userfind= await User.findOne({email:email});
                res.status(appError.status).json({jwt:token,user:userfind,message:appError.message});
            })
        }
        else
        {
            const appError=new AppError(constantUser.FAILED_MESSAGE,constantUser.FAILED_METHOD);
            res.status(appError.status).json({message:appError.message});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:[{"msg":"Server errors"}]});
    }
    }

    async updateProfileForCustomer(req,res)
    {
        console.log("Go to update profile")
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
            const appError=new AppError(constantUser.SUCCESS_MESSAGE,constantUser.SUCCESS_METHOD);
            res.status(appError.status).json({user:userResult,message:appError.message});

        }
        catch(error){
            const appError=new AppError(constantUser.FAILED_MESSAGE,constantUser.FAILED_METHOD);
            res.status(appError.status).json({message:appError.message});
        }
        }
    async updateWithAdmin(req,res)
    {
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
        const appError=new AppError(constantUser.SUCCESS_MESSAGE,constantUser.SUCCESS_METHOD);
            res.status(appError.status).json({user:userResult,message:appError.message});

    }
    catch(error)
    {
        const appError=new AppError(constantUser.FAILED_MESSAGE,constantUser.FAILED_METHOD);
            res.status(appError.status).json({message:appError.message});
    }
    }

    async findById(req,res)
    {
        const userFind=await User.findById(req.params.idUser).select("-password");
        if(!userFind)
        {
            const appError=new AppError(constantUser.FAILED_MESSAGE,constantUser.FAILED_FIND_MESSAGE);
            res.status(400).json({error:[{"msg":"User have exist"}]});
    
        }
        
        const appError=new AppError(constantUser.SUCCESS_MESSAGE_FINDBYID,constantUser.SUCCESS_FIND_METHOD);
        res.status(200).json(userFind);
    }
    async findAll(req,res)
    {
        let query=User.find().select("-password");
        const users=await query;
        res.status(200).json(users);
    }

    async deleteByAdmin(req,res)
    {
        const userdelete=await User.findById(req.params.userid);
        if(!userdelete)
        {
            const appError=new AppError(constantUser.FAILED_MESSAGE,constantUser.FAILED_FIND_MESSAGE);
            res.status(appError.status).json({message:appError.message});
        }
        await User.findByIdAndUpdate(req.params.userid,{$set:{status:false}});
        const result=await User.findById(req.params.userid);
        const appError=new AppError(constantUser.SUCCESS_MESSAGE_DELETE,constantUser.SUCCESS_DELETE_METHOD);
        res.status(appError.status).json(result);
    }

    async updatePassword(req,res)
    {
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
    }
}
module.exports=new userController;