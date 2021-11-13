const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");





const OrderCompletedSchema=mongoose.Schema({
    orderId:
    {

    },
    
});




OrderCompletedSchema.plugin(autoIncrement.plugin,'OrderCompletedSchema');


module.exports = mongoose.model('ordercompleted',OrderCompletedSchema);