const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");
const Schema = mongoose.Schema

const color=mongoose.Schema({
    colorName: {
        type: String,
      },
      quantity:{
        type:Number
      }
},{ _id : false }
);


const SizeSchema=mongoose.Schema({
    nameSize:{
        type:String
    },
    productId: {
        type: Number,
        required: true
      },
    
    colors:[color] 
});


autoIncrement.initialize(mongoose.connection);
SizeSchema.plugin(autoIncrement.plugin,'Size');

module.exports = mongoose.model('size', SizeSchema);




