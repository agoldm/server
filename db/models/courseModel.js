const mongoose = require('mongoose');

const times = new mongoose.Schema({
    time_in_day: { type: Date },
    day_in_week: { type: Date },
    start_date: { type: Date },
    end_date: { type: Date },
    long: { type: String },
});

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    course_times: { type: times, default: {} },
    price_per_time: { type: String, required: true },
    max_student: { type: Number, required: true },
    image: { type: String },
    teacher_id: { type: String },
    num_of_classes: { type: Number },
    students_ids: { type: [mongoose.Schema.Types.ObjectId] },
    rating: { type: Number },
    status: { type: Boolean, default: true }
});

const courseModel = mongoose.model('courses', courseSchema);
exports.courseModel = courseModel;