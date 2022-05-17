const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");

const Datesetup=mongoose.Schema({
    day: {
        type: Number,
      },
      month: {
        type: Number,
      },
      year: {
        type: Number,
      },
      hour: {
        type: Number,
      },
      minute: {
        type: Number,
      },
      second:{
        type: Number,
      }
},{ _id : false }
);


const CouponsSchema = mongoose.Schema({
   
    nameVouncher: {
        type: String
      },
    description: {
        type: String
    },
    discountPercent:
    {
        type:Number
    },
    statusCoupon: {
        type: Boolean
    },
    dateStart: Datesetup,
    dateEnd: Datesetup,
    priceOrderLimit:{
        type: Number
    }
});


CouponsSchema.plugin(autoIncrement.plugin,'coupon');


module.exports = mongoose.model("coupons", CouponsSchema);
