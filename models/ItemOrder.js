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
    sizeId: {
        type: Number,
        ref:"size"
      },
      colorName: {
        type: String,
      },
      nameSize:{
        type:String
    },
    totalPrice:{
        type:Number,
        require:true
    }
});


ItemSchema.plugin(autoIncrement.plugin,'ItemSchema');


module.exports = mongoose.model('item',ItemSchema);