const nodemailer=require("nodemailer");




  module.exports = function(message) {
    const transport=nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: "465",
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "ecommercefashion123@gmail.com",
          pass: "123456789a@",
        },
      });
  
      transport.verify(function (error, success) {
      // Nếu có lỗi.
      if (error) {
        console.log(error);
      } else {
        //Nếu thành công
        //Tiến hành gửi email
      transport.sendMail(message,(error,infor)=>{
            if(error)
            {
                console.log(error);
                
            }
            console.log("Email sent success");
        });
      }
    });
  };


// module.exports.sendEmail=(message)=>async function(req,res,next)
// {
//     console.log("Go to email")
//     await 
// }