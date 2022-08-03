const { courseModel } = require("../db/models/courseModel")

exports.getAllCourses = async (userID = null) => {
    try {
        let data = await courseModel.find({ teacher_id: userID })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

exports.getMyStudents = async (userID = null) => {
    try {
        let data = await courseModel.find({ teacher_id: userID }).populate('students_ids')
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.addCourse = async (newCourse) => {
    try {
        let course = new courseModel(newCourse)
        let data = await course.save();
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.updateCourse = async (course) => {
    try {
        let data = await courseModel.updateOne({ _id: course._id }, course)
        if (data.modifiedCount > 0) {
            return { success: true, data: data };
        } else {
            return { success: false, error: true };
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.deleteCourse = async (id) => {
    try {
        let data = await courseModel.deleteOne({ _id: id })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
