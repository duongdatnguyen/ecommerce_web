const passport=require('passport');
const strategy=require('passport-facebook');
const User=require("../models/Users");
const generator=require('generate-password');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const configgoogle=require("./configGoogle");
const bcrypt=require("bcrypt");
const FacebookStrategy=strategy.Strategy;
const sendEmail=require("../services/sendMail");
const {facebook_key,facebook_secret,callback_url}=require("./configFacebook");


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use('facebook',
    new FacebookStrategy(
      {
        clientID: facebook_key,
        clientSecret: facebook_secret,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["email", "name"]
      },
      function(accessToken, refreshToken, profile, done) {
       try{
          console.log(profile);
          console.log("accessToken",accessToken);
          console.log("refreshToken",refreshToken);

       }
       catch(error)
       {
         done(error,false,error.message);
       }
      }
    )
  );



// passport.use('facebook',new FacebookStrategy({
//     clientID:facebook_key,
//     clientSecret:facebook_secret,
//     callbackURL:callback_url,
//     profileFields: ["email", "name"]
//     },
//     async (accessToken, refreshToken, profile, done)=>
//     {
//             console.log(profile);
//             console.log("accessToken",accessToken);
//             console.log("refreshToken",refreshToken);
//             done(null,profile);
//         // try{
//         //     console.log("Going authenticate");
//         //     const email=profile.emails[0].value;
//         //     const userExist=await User.find({email:email});
//         //     if(userExist)
//         //     {
//         //        if(!userExist.facebookId)
//         //        {
//         //            await User.findOneAndUpdate({email:email},{$set:{facebookId:profile.id}});
//         //        } 
//         //        return done(null,userExist);

//         //     }

//         //     const salt=await bcrypt.genSalt(10);
//         //     const password = generator.generate({
//         //         length: 10,
//         //         numbers: true
//         //     });
//         //     console.log(password);

//         //     let passwordhashed=await bcrypt.hash(password,salt);
//         //     const {fistname,lastname}=profile;
//         //     const facebookId=profile.id;
//         //     const useradd=new User({fistname,lastname,email,password,facebookId,phonenumber});
//         //     useradd.password=passwordhashed;
            
//         //     await useradd.save();
//         //     done(null,useradd);
//         // }
//         // catch(error)
//         // {
//         //     done(error, false);
//         // }
//     }


// ))
      passport.use(new GoogleStrategy({
        clientID: configgoogle.lientID,
        clientSecret: configgoogle.clientSecret,
        callbackURL: configgoogle.callbackURL
      },
      async function(accessToken, refreshToken, profile, done) {

        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          if (!existingUser.facebookId) {
            await User.findOneAndUpdate(
              existingUser.id ,
              {
                $set: {
                  googleId: profile.id,
                },
              }
            );
          }
          return done(null, existingUser);
        }
        const newPassword = generator.generate({
                                    length: 10,
                                    numbers: true,
                                  });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const user = new User({
          email: profile.emails[0].value,
          password: hashPassword,
          facebookId: profile.id,
          fistname:profile._json.given_name,
          lastname:profile._json.family_name,
          role: "user",
          status: true,
        });
        const message={ // thiết lập đối tượng, nội dung gửi mail
          from: 'Ecomerrce tieu luan chuyen nganh',
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
      done(null, saveUser);
        }
));