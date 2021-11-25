const paypal = require('paypal-rest-sdk');
const configPayment=require("../config/configPayment");
const express=require("express");
const AppError = require('../models/AppError');
const router=express.Router();


paypal.configure({
    'mode': configPayment.mode, //sandbox or live
    'client_id': configPayment.client_id,
    'client_secret': configPayment.client_secret
  });

  router.post("/payment",async(req,res)=>{
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/pay/success",
            "cancel_url": "http://localhost:3000/pay/cancel"
        },
        "transactions": [{
            // "item_list": {
            //     "items": [{
            //         "name": "Redhock Bar Soap",
            //         "sku": "001",
            //         "price": "25.00",
            //         "currency": "USD",
            //         "quantity": 1
            //     }]
            // },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Washing Bar soap"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      });
})

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log("error here");
          console.log(error.response);
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });
router.get('/cancel', (req, res) => res.status(400).json({msg:"Cancel Payment"}));

module.exports=router;
