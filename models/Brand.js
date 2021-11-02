const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");


const BrandSchema = mongoose.Schema({
  nameBrand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


BrandSchema.plugin(autoIncrement.plugin,'Brands');


module.exports = mongoose.model("Brands", BrandSchema);