const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");
const Schema = mongoose.Schema



const CategorySchema=mongoose.Schema({
    nameCategory:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true,
        default:true
    },
    datecreated:{
        type: Date, default: Date.now
    },
    subcategories:[{
        type: Number,
            ref:"subCategory"
    }]
});


autoIncrement.initialize(mongoose.connection);
CategorySchema.plugin(autoIncrement.plugin,'Category');

module.exports = mongoose.model('category', CategorySchema);




