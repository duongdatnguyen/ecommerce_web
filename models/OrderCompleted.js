const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");





const OrderCompletedSchema=mongoose.Schema({
    orderId:
    {
        type:Number,
        ref:"order"
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
        enum:["Waiting","Shipping","Done"],
        default:"Waiting"
    }
    
    
});




OrderCompletedSchema.plugin(autoIncrement.plugin,'OrderCompletedSchema');


module.exports = mongoose.model('ordercompleted',OrderCompletedSchema);