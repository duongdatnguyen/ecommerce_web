const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");

const ProductSchema=mongoose.Schema({

    subcategoryId: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: "subCategory",
      },
      size: {
        type: mongoose.Schema.Types.Number,
        ref: "size",
      },
      name: {
        type: String,
        required: true,
      },
      orgin: {
        type: String,
        required: true,
      },
      material: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
        default:true
      },
      images:{
        type:Array
      },
      dateCreate: {
        type: Date,
        default: Date.now,
      },
      content:{
        type:String
      },
      quantity:{
        type:Number
      },
      saleId:
      {
        type: mongoose.Schema.Types.Number,
        ref: "sales",
      }
      
});

ProductSchema.plugin(autoIncrement.plugin,'ProductSchema');


module.exports = mongoose.model('product',ProductSchema);
