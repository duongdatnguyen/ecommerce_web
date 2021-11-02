const mongoose=require("mongoose");
const autoIncrement= require("mongoose-auto-increment");





const CategorySchema=mongoose.Schema({
    nameCategory:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    },
    datecreated:{
        type: Date, default: Date.now
    }

});


autoIncrement.initialize(mongoose.connection);
CategorySchema.plugin(autoIncrement.plugin,'Category');

module.exports = mongoose.model('category', CategorySchema);




