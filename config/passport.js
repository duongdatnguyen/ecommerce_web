const passport=require('passport');
const strategy=require('passport-facebook');
const User=require("../models/Users");
const generate=require('generate-password');


const FacebookStrategy=strategy.Strategy;

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

