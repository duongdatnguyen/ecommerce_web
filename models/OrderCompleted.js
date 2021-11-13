const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");





const OrderCompletedSchema=mongoose.Schema({
    orderId:
    {
        type:Number,
        ref:"order"
    },
    addressrecevie:{
        city:{
            type:String,
            required:true,
            min:3
          },
          district:{
            type:String,
            required:true,
            min:3
          },
          ward: {
            type: String,
            required: true,
          },
          street:{
            type:String,
            required:true,
            min:3
          }
    },
    shiprice:{
        type:Number,
        require:true
    },
    totalPrice:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["Waiting","Shipping","Done"]
    },
    
    
});




OrderCompletedSchema.plugin(autoIncrement.plugin,'OrderCompletedSchema');


module.exports = mongoose.model('ordercompleted',OrderCompletedSchema);