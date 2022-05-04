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

const SaleSchema = mongoose.Schema({
    productId:
    {
        type:mongoose.Schema.Types.Number,
        ref:"product"
    },
    nameSale: {
        type: String
      },
    description: {
        type: String
    },
    percentSale:
  {
    type:Number
  },
    statusSale: {
        type: Boolean
    },
    dateStart: Datesetup,
    dateEnd: Datesetup,
    quantityDiscount:{
        type: Number
    }
});


SaleSchema.plugin(autoIncrement.plugin,'sale');


module.exports = mongoose.model("sales", SaleSchema);