const mongoose = require('mongoose');
const { userModel } = require('./userModel');

const classSchema = new mongoose.Schema({
    course_name: { type: String },
    time: { type: Date },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    price_per_hour: { type: Number },
});

const classModel = mongoose.model('flowers', classSchema);
exports.classModel = classModel;