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
        enum:["Done","Failed"]
    }
    
    
});




OrderCompletedSchema.plugin(autoIncrement.plugin,'OrderCompletedSchema');
OrderCompletedSchema.set('timestamps', true);

module.exports = mongoose.model('ordercompleted',OrderCompletedSchema);