const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    description: { type: String },
    place: { type: String },
});

const courseModel = mongoose.model('courses', courseSchema);
exports.courseModel = courseModel;