const nodemailer=require("nodemailer");
const configGoogleMail=require("../config/configGoogleMail");
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  configGoogleMail.GOOGLE_CLIENT_ID,
  configGoogleMail.GOOGLE_SECRET_CLIENT,
  configGoogleMail.GOOGLE_REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token:  configGoogleMail.GOOGLE_REFRESH_TOKEN});

  module.exports =async function(message) {
    try{
    const accessToken = await oAuth2Client.getAccessToken();

    const transport=nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'laptrinhweb66@gmail.com',
        clientId: '82159906286-8kqh24268f5kudtsm2k619u96hooomgc.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//047RvmiEaA3aGCgYIARAAGAQSNwF-L9IrlclSg403vxEWCZWuvrakZAyY5b52Hf3oBrULjC1fEX7bEyOG_2FtPmrRAbAN2iqoBBA',
        accessToken: accessToken,
      },
      });
      console.log("Going to send email")
     
       
      transport.sendMail(message,(error,infor)=>{
            if(error)
            {
              console.log("Co loi ");
                console.log(error);
                
            }
            console.log("Email sent success");
        });
  }
  catch(error)
  {
    console.log(error);
  }
  };


// module.exports.sendEmail=(message)=>async function(req,res,next)
// {
//     console.log("Go to email")
//     await 
// }