const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

const ColorOptionSchema = mongoose.Schema({
   
    color: {
      type: String,
      required: true,
    },
    quantity:{
      type:Number,
      required: true,
    },
    image: {
      type: String
    },
  });
  module.exports = mongoose.model("colorOptions", ColorOptionSchema);
  