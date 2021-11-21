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
        enum : ['Pending','Done','Cancel']
    },
    addressrecevie:{
        name:
        {
          type:String,
          min:3,
        },
        phonenumber:
        {
          type:String,
        },
        address:{
          type:String,
          default:true
        },
        // city:{
        //     type:String,
        //     required:true,
        //     min:3
        //   },
        //   district:{
        //     type:String,
        //     required:true,
        //     min:3
        //   },
        //   ward: {
        //     type: String,
        //     required: true,
        //   },
        //   street:{
        //     type:String,
        //     required:true,
        //     min:3
        //   }
    }
});


OrderSchema.plugin(autoIncrement.plugin,'OrderSchema');
OrderSchema.set('timestamps', true);

module.exports = mongoose.model('order',OrderSchema);