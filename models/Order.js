const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");


const OrderSchema=mongoose.Schema({

    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    items:[
        {
            type:Number,
            ref:"item"
        }
    ],
    totalPrice:{
        type:Number,
        require:true,
    },
    priceDiscount :{
        type:Number
    },
    status:
    {
        type:String,
        default:'Pending',
        enum : ['Pending','Done','Cancel',"FailedShipping"]
    },
    addressrecevie:{
        name:
        {
          type:String
        },
        phonenumber:
        {
          type:String,
        },
        address:{
          type:String
        },
        city:{
            type:String
          },
          district:{
            type:String
          },
          ward: {
            type: String
          },
          street:{
            type:String
          }
    },
    address:{
        type:String,

    },
    paymentId:{
        type:String
    },
    isPaypal:
    {
        type:Boolean
    },
    paymentMethod:{
      type:String,
      enum:["None","Paypal","VnPay"],
      default:"None"
    }
});


OrderSchema.plugin(autoIncrement.plugin,'OrderSchema');
OrderSchema.set('timestamps', true);

module.exports = mongoose.model('order',OrderSchema);