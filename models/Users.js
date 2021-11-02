const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
        fistname: {
        type: String,
        required: true,
        min:3
        },
        lastname: {
          type: String,
          required: true,
          min:3
          },
        email: {
        type: String,
        required: true,
        unique: true
        },
        password: {
          type: String,
          required: true,
         
        },
        googleId: {
          type: String,
          required: false,
          min: 6,
          max: 1024,
        },
        facebookId: {
          type: String,
          required: false,
          min: 6,
          max: 1024,
        },
        gender:{
          type:String,
          required:true,
          enum: ['Man', 'Female','None'],
          min:3
          
        },
        role:{
          type:String,
          required:true,
          enum: ['user','admin','superadmin'],
          default:'user',
          min:3
          
        },
        addresses:[
          {
            city:{
              type:String,
              required:true,
              min:3
            },
            district:{
              type:String,
              required:true,
              min:3
            },
            ward: {
              type: String,
              required: true,
            },
            street:{
              type:String,
              required:true,
              min:3
            },
            default:{
              type:Boolean,
              required:true
            }
          }
        ],
        phonenumber:{
          type:String,
          required:true,
          min:10
        },
        status:{
          type:Boolean,
          required:true,
          default:true
        }

});
module.exports = mongoose.model('user', UserSchema);