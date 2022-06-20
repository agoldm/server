const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    long: {type: String},
    // time_in_day: {type:},
    // day_in_week: {type:},
    price_per_time: { type: String, required: true },
    max_student: {type: Number, required: true},
    start_date: {type: Date},
    end_date: {type: Date},
    image: {type: String},
    teacher_id: {type: String},
    num_of_classes: {type: Number},
    students_ids: {type: [mongoose.Schema.Types.ObjectId]},
    rating: {type: Number}
});

const courseModel = mongoose.model('courses', courseSchema);
exports.courseModel = courseModel;