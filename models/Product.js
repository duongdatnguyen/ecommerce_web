const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");

const ProductSchema=mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: "category.subCategory.subCategoryId",
      },
      brandId: {
        type: mongoose.Schema.Types.Number,
        required: true,
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
      dateCreate: {
        type: Date,
        default: Date.now,
      },
});

ProductSchema.plugin(autoIncrement.plugin,'ProductSchema');


module.exports = mongoose.model('product',ProductSchema);
