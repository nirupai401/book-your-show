const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        uniquee:true
    },
    username:{
        type:String,
        minLength:3,
        maxLength:20,
        unique:true,
    },
    password:{
        type:String
    },
        role:{
            type:String,
            enum:['ADMIN','PARTNER','USER'],
            default:'USER'
        }
    
},{versionKey : false, timestamps:true});

const User=mongoose.model('User',userSchema);

module.exports=User;