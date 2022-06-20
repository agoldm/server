const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required: true},
    email: {type:String, required: true, unique: true},
    username: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    phone: {type:String, required: true},
    image: {type:String},
    gender:{type: String},
    role: {type:String, default:"students"},
    description: {type: String}, 
    rating: {type: Number},
    // courses: {type: [mongoose.Schema.Types.ObjectId]}, //[course_id]
    // history: {type: [String]}, //[course_id]
    favorite: {type: [String]}, //[course_id]
});

const userModel = mongoose.model('users', userSchema);
exports.userModel = userModel;
