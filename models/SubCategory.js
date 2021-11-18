const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");


const SubCategorySchema=mongoose.Schema(
    {
        categoryID:{
            type:Number,
            ref:"category"
        },
        
        namesubCategory:{
            type:String,
            require:true
        },
        substatus:{
            type:Boolean,
            require:true,
            default:true
        },
        icon:{
            type:String,
            default:""
        },
        date:{
            type: Date, default: Date.now
        }
    }
);

autoIncrement.initialize(mongoose.connection);
SubCategorySchema.plugin(autoIncrement.plugin,'subCategory');

module.exports = mongoose.model('subCategory', SubCategorySchema);
