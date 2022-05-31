const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String},
    email: {type:String,unique:true},
    username: {type:String,unique:true},
    password: {type:String},
    phone: {type:String},
    image: {type:String},
    category: {type:String,default:"students"}
});

const userModel = mongoose.model('users', userSchema);
exports.userModel = userModel;
