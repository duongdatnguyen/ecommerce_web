const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");


const ItemSchema=mongoose.Schema({

    productId:
    {
        type:mongoose.Schema.Types.Number,
        ref:"product"
    }, 
    quantity:
    {
        type:Number,
        require:true,
        default:1
    },
      colorName: {
        type: String,
      },
      sizeId:{
        type:Number
    },
      sizeName:{
        type:String
    },
    priceDiscount:{
        type:Number
    },
    totalPrice:{
        type:Number,
        require:true
    }
});


ItemSchema.plugin(autoIncrement.plugin,'ItemSchema');


module.exports = mongoose.model('item',ItemSchema);