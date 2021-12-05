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

const sendEmail=require("../../services/sendMail");
const AppError = require("../../models/AppError");

/**GET
 * API '/'
 * Get get user with token
 */

 router.get("/auth",auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(error)
    {
        console.log(error);
        res.send("Server errors");
    }
});

/**POST
 * email,password
 * Login with email, password
 */
router.post("/auth",async(req,res)=>{
   
        const {email,password}=req.body;
        try{
            const user=await User.findOne({email:email});
            if(!user)
            {
                res.json({error:[{"msg":"User invalid on database"}]});
            }
            else
            {
                let isMatch=await bcrypt.compare(password,user.password);
                console.log(isMatch);

                if(!isMatch)
                {
                    return res.status(400).json({error:[{msg:'Email or password incorrect'}]});
                }
                const payload={
                    user:
                    {id:user.id},
                }

                jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
                    if(error) return  res.json({error:[{"msg":error}]});
                    const message={ // thiết lập đối tượng, nội dung gửi mail
                        from: 'Ecomerce web',
                        to: user.email,
                        subject: 'Register success',
                        text: "You recieved message from",
                        html: "<p>you have register via email to web ecomerce<p>"
                    }
                    // console.log(message);
                    sendEmail(message);

                const userfind=await User.findOne({email:email}).select("-password");
                    res.json({jwt:token,user:userfind});
                })

                


            }
        }
        catch(error)
        {
            console.log(error);
            //return  AppError({error});
        }
})


/**Protect
 * 
 * 
 */
router.get("/auth/facebook",passport.authenticate('facebook',{scope:'email'}));

 router.get(
    "auth/facebook/callback",
    passport.authenticate("facebook",
    function(req,res)
    {
        if(!req.user)
        {
            return res.status(400).json(new AppError("Can't connect user"));
        }
        const payload={
            user:
            {id:req.user.id},
        }

        jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
            if(error) return  res.json({error:[{"msg":error}]});
            console.log(token)
            return res.status(200).json({jwt:token,user:req.user});
        })
    }
  ));

router.get("/auth/fail",(req, res) => {
    console.log("Failed attempt");
    res.send();
  })
 

router.get("/auth/success",(req, res) => {
    console.log(req.user);
    res.send("Sucess");
  })
//  router.get("/auth/facebook/callback",passport.authenticate('facebook'),async(req,res)=>{
//      const user=await User.findOne({'email':req.user.email});
//      if(!user)
//      {
//          res.status(400).json({error:[{"msg":"User isn't exist"}]});
//      }
//      if(!user.status)
//      {
//          res.status(400).json({error:[{"msg":"User have deleted"}]});
//      }
//      const payload={
//          user:{
//              id:user.id,
//          }
//      }
 
 
//      jwt.sign(payload,Sercet_token,{expiresIn:3600},(error,token)=>{
//          if(error) throw error;
//          res.json({token});
//      })
//  });

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));


router.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
    if(!req.user)
    {
        return res.status(400).json(new AppError("Can't connect user"));
    }
    const payload={
        user:
        {id:req.user.id},
    }

    jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
        if(error) return  res.json({error:[{"msg":error}]});
        return res.status(200).json({jwt:token,user:req.user});
    })
  });


module.exports=router;
