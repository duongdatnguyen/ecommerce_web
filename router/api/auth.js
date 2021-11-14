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
                        from: 'Thanh Batmon',
                        to: 'nguyenduongdat0308@gmail.com',
                        subject: 'Test Nodemailer',
                        text: "You recieved message from",
                        html: "<p>You have got a new message<p>"
                    }
                    // console.log(message);
                    // sendEmail(message);

                const userfind=await User.findOne({email:email}).select("email role");
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
    passport.authenticate("facebook", {
      successRedirect: "/auth/fail",
      failureRedirect: "/auth/success",
      failureFlash: true
    })
  );

router.get("/auth/fail",(req, res) => {
    console.log("Failed attempt");
    res.send("Failed attempt");
  })
 

router.get("/auth/success",(req, res) => {
    console.log("Success");
    res.send("Success");
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

module.exports=router;
