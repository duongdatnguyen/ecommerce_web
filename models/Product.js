const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");

const ProductSchema=mongoose.Schema({

    subcategoryId: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: "subCategory",
      },
      brandId: {
        type: mongoose.Schema.Types.Number,
        ref: "Brands",
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
        type:String,
        default:""
      },
      dateCreate: {
        type: Date,
        default: Date.now,
      },
      content:{
        type:String,
        enum:["New","Old","Sale Off"],
        default:"New"
      }
});

ProductSchema.plugin(autoIncrement.plugin,'ProductSchema');


module.exports = mongoose.model('product',ProductSchema);
