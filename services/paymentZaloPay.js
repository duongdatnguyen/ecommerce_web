

module.exports.createPaymentZalo=function(orderRequest)
{

    var dateFormat = require("dateformat");
    const CryptoJS = require('crypto-js');
    const Buffer= require('buffer').Buffer ;



const config = {
    appid: "553",
    key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
    key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
  };
  
  const embeddata = {
    merchantinfo: "Thanhtoandonhang"
  };
  
  const items = [{
    itemid: "knb",
    itemname: "kim nguyen bao",
    itemprice: 198400,
    itemquantity: 1
  }];
  var date = new Date();
  var paymentId =dateFormat(date, "HHmmss");

  const order = {
    appid: config.appid, 
    apptransid: paymentId, // mã giao dich có định dạng yyMMdd_xxxx
    appuser: "demo", 
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(orderRequest.items), 
    embeddata: JSON.stringify(embeddata), 
    amount: orderRequest.totalPrice, 
    description: "Hermesshop demo zalo pay",
    bankcode: "zalopayapp", 
    channel:36
  };
  
  // appid|apptransid|appuser|amount|apptime|embeddata|item
  const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  const b64Order=Buffer.from(JSON.stringify(order)).toString('base64');

  const url='https://sbgateway.zalopay.vn/pay?order='+encodeURIComponent(b64Order);


  return url;

}

module.exports.callBackURL=function (req,res)
{
    let result = {};

    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
  
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
  
  
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.returncode = -1;
        result.returnmessage = "mac not equal";
      }
      else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log("update order's status = success where apptransid =", dataJson["apptransid"]);
  
        result.returncode = 1;
        result.returnmessage = "success";
      }
    } catch (ex) {
      result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.returnmessage = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    res.json(result);
}

