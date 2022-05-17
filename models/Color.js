const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

const ColorOptionSchema = mongoose.Schema({
   
      colorName: {
        type: String,
      },
      quantity:{
        type:Number
      },
        image: {
          type: String
        }
  });

autoIncrement.initialize(mongoose.connection);
ColorOptionSchema.plugin(autoIncrement.plugin,'color');
module.exports = mongoose.model("colorOptions", ColorOptionSchema);
  