const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");


const SubCategorySchema=mongoose.Schema(
    {
        ParentCategoryId:{
            type:Number,
            ref:"category"
        },
        namesubCategory:{
            type:String,
            require:true
        },
        substatus:{
            type:Boolean,
            require:true
        },
        icon:{
            type:String,
        },
        date:{
            type: Date, default: Date.now
        }
    }
);

autoIncrement.initialize(mongoose.connection);
SubCategorySchema.plugin(autoIncrement.plugin,'subCategory');

module.exports = mongoose.model('subCategory', SubCategorySchema);
