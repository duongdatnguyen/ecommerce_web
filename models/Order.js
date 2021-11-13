const mongoose = require("mongoose");

const autoIncrement= require("mongoose-auto-increment");


const OrderSchema=mongoose.Schema({

    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    items:[
        {
            type:Number,
            ref:"item"
        }
    ],
    totalPrice:{
        type:Number,
        require:true,
    },
    status:
    {
        type:String,
        default:'Pending',
        enum : ['Pending','Process','Done','Cancel']
    }
});


OrderSchema.plugin(autoIncrement.plugin,'OrderSchema');
OrderSchema.set('timestamps', true);

module.exports = mongoose.model('order',OrderSchema);