const { courseModel } = require("../db/models/courseModel");
const { userModel } = require("../db/models/userModel");

exports.getAllCourses = async () => {
    try {
        let data = await courseModel.find()
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: true };
    }
}
exports.getMyCourses = async (userID) => {
    try {
        let data = await courseModel.find({ teacher_id: userID })
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: true };
    }
}
exports.getMyStudents = async (userID) => {
    try {

        let data = await courseModel.find({ teacher_id: userID });//כל היוזרים CONTACT
        let ids = [];
        data.map(c => {
            ids = [...ids, c.students_ids]
        });
        console.log(ids);
        // delete duplicated
        let uniqueId = [];
        ids.forEach((c) => {
            if (!uniqueId.includes(c)) {
                uniqueId.push(c);
            }
        });


        const records = await userModel.find({ _id: { $in: uniqueId } })

        console.log(records);
        return { success: true, data: records };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

exports.getMyTeachers = async (userID) => {
    try {
        let data = await courseModel.find({ students_ids: userID }).populate('teacher_id')
            .exec(function (err, users) {
                data = users.filter(function (course) {
                    console.log(course);
                    return course.teacher_id;
                });
            });
        console.log(1, data);
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.signCourse = async (courseId, studentId) => {
    try {
        let data = await courseModel.updateOne({ _id: courseId }, { $addToSet: { 'students_ids': studentId } })
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
exports.getStudentCourses = async (userID) => {
    try {
        let data = await courseModel.find({ students_ids: userID })
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
