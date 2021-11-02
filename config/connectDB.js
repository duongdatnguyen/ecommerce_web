const mongoose=require('mongoose');
//const config=require('config');
// const db=config.get('mongoURI');
const {MongoURI}=require("./default");
const db="mongodb+srv://datnd:18110092spk@cluster0.4tqcs.mongodb.net/ecommerceweb?retryWrites=true&w=majority";
const connectDB=async()=>{
    try
    {
      await  mongoose.connect(MongoURI);
      console.log('Connect success');
    }
    catch(err)
    {
        process.exit(1);
        console.log(err);
    }
}

module.exports=connectDB;