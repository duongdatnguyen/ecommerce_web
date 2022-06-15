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
const generator=require('generate-password');
const sendEmail=require("../../services/sendMail");
const AppError = require("../../models/AppError");
const configgoogle=require("../../config/configGoogle");
const {OAuth2Client}=require("google-auth-library");



const client=new OAuth2Client("907790633444-0fnqh5mpf12k1jfes1pal08gv51vhnsh.apps.googleusercontent.com");

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
                res.status(400).json({error:[{"msg":"User invalid on database"}]});
            }
            else
            {
              if(!user.status)
              {
                return res.status(400).json({error:[{"msg":"User have deleted in the system"}]});
              }
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
                    await sendEmail(message);

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
  passport.authenticate('google', { scope: ['profile','email'] }),async(req,res)=>{

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


// router.get('/auth/google/callback', 
//   passport.authenticate('google'),
//   function(req, res) {
//     if(!req.user)
//     {
//         return res.status(400).json(new AppError("Can't connect user"));
//     }
//     const payload={
//         user:
//         {id:req.user.id},
//     }

//     jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
//         if(error) return  res.json({error:[{"msg":error}]});
//         return res.status(200).json({jwt:token,user:req.user});
//     })
//   });

async function verifyGoogle(token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: configgoogle.lientID,
    });
    return ticket.getPayload();
  }

router.post("/googlelogin",async(req,res)=>{
    const {tokenId}=req.body;
    let errorResult="";
    let result = await verifyGoogle(tokenId);

    const email = result.email;
        const existingUser = await User.findOne({ email:email });
        if (existingUser) {
          if (!existingUser.googleID) {
            await User.findOneAndUpdate(
              existingUser.id ,
              {
                $set: {
                  googleId: result.sub,
                },
              }
            );
          }
          if(!existingUser.status)
              {
                return res.status(400).json({error:[{"msg":"User have deleted in the system"}]});
              }

          const payload={
                    user:
                    {id:existingUser.id},
                }
            
                jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
                    if(error) return  res.json({error:[{"msg":error}]});
                    return res.status(200).json({jwt:token,user:existingUser});
                })
        }
        else
        {
        const newPassword = generator.generate({
                                    length: 10,
                                    numbers: true,
                                  });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const user = new User({
          email: result.email,
          password: hashPassword,
          googleId: result.sub,
          fistname:result.given_name,
          lastname:result.family_name,
          role: "user",
          status: true,
        });
        errorResult="Going to send email";
        const message={ // thiết lập đối tượng, nội dung gửi mail
          from: 'Ecomerrce KLTN',
          to: user.email,
          subject: 'Create new account',
          text: "Tài khoản của bạn đã được đăng nhập vào website",
          html: "<span>Bạn vừa đăng nhập nhập tài khoản bằng Google hoặc Facebook. Dưới đây là mật khẩu mới của bạn!" +
          "</span> </br><h2>" +
          newPassword +
          "</h2>"
      }
      sendEmail(message);
      const saveUser = await user.save();
      const payload={
        user:
        {id:saveUser.id},
    }

    jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
        if(error) return  res.json({error:[{"msg":error}]});
        return res.status(200).json({jwt:token,user:saveUser});
    })
   }
})

router.post("/resetpassword/generate-token",async(req,res)=>{

  // const emailReset=req.query.email;
  const emailReset=req.body.email;

  const userReset=await User.findOne({"email":emailReset});

  const token = generator.generate({
    length: 10,
    numbers: true,
  });

  const salt = await bcrypt.genSalt(10);
  const tokenHash = await bcrypt.hash(token, salt);

  userReset.token=tokenHash;

  let time= Date.now()+10*60*1000;
  userReset.timeValidtoken=time;

  let resetURL=process.env.URL_SYSTEM +"reset-password/"+`${tokenHash}`;
  const message={ // thiết lập đối tượng, nội dung gửi mail
    from: 'Ecomerrce KLTN',
     to: userReset.email,
    //to: "nguyenduongdat0308@gmail.com",
    subject: 'Reset password',
    text: "Tài khoản của bạn đã yêu cầu đổi mật khẩu",
    html: `
    <div style="max-width: 700px; margin:auto; border: 4px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Ecommerce website</h2>
    <p>Just click the button below to reset your password !</p>
    
    <a href=${resetURL} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset password</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div>${resetURL}</div>
    </div>
`
}
 await sendEmail(message);


await userReset.save();


return res.status(200).json({"message":"Please check your email to reset password"});

});



router.put("/resetpassword/reset",async(req,res)=>{
  const tokenCheck=req.body.token;
  console.log(tokenCheck);
  const userUpdate= await User.findOne({
                                          "token":tokenCheck,
                                          "timeValidtoken":{$gt:Date.now()}});

  if(!userUpdate)
  {
    res.status(400).json({"error":"User is null"});
  };



  const password= req.body.passwordNew;

  
  const salt = await bcrypt.genSalt(10);
  let passwordhashed=await bcrypt.hash(password,salt);
  
  userUpdate.password=passwordhashed;

  //reset token and time valids
  userUpdate.token="";
  userUpdate.timeValidtoken=null;


  await userUpdate.save();

//   const payload={
//     user:
//     {id:userUpdate.id},
// }

return res.status(200).json({"message":"Update password success"});


// jwt.sign(payload,Sercet_token,{expiresIn:36000},async function(error,token){
//     if(error) return  res.json({error:[{"msg":error}]});
//     return res.status(200).json({jwt:token,user:userUpdate});
// })
})



module.exports=router;
