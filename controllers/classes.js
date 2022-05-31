const { classModel } = require("../db/models/classModel")

exports.getAllClasses = async () => {
    try {
        let data = await classModel.find({})
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.addClass = async (newClass) => {
    try {
        let singleClass = new classModel(newClass)
        let data = await singleClass.save();
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.updateclass = async(id, singleClass) => {
    try {
        let data = await classModel.updateOne({ _id: id }, singleClass)
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.deleteClass = async (id) => {
    try {
        let data = await classModel.deleteOne({ _id: id })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
