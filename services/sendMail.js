const nodemailer=require("nodemailer");




  module.exports = function(message) {
      console.log("Going to email")
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
        //Nếu thành công.
        console.log("Kết nối thành công!");
        //Tiến hành gửi email
        transport.sendMail(message,(error,infor)=>{
            if(error)
            {
                console.log(error);
                res.status(400).json({"msg":"Email failed"});
            }
            console.log(infor);
            res.status(200).json({"msg":"Email success"});
        });
      }
    });
  };


// module.exports.sendEmail=(message)=>async function(req,res,next)
// {
//     console.log("Go to email")
//     await 
// }