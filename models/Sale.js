const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");

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
    quantityDiscount:{
        type: Number
    }
});


SaleSchema.plugin(autoIncrement.plugin,'sale');


module.exports = mongoose.model("sales", SaleSchema);