const { userModel } = require("../db/models/userModel")

exports.register = async (user) => {
    try {
        let data = await userModel.findOne({ $or: [{ mail: user.mail }, { username: user.username }] })
        if (data) return { success: false, error: true, status: 400 };
        return exports.addUser(user)
    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }
}
exports.changePassword = async (username,password,newPassword) => {
    try {
        let data = await userModel.findOne({username,password});
        if (!data) return { success: false, error: true, status: 401 };
        data.password = newPassword;
        return exports.updateUser(data._id, data);
    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }
}

exports.getAllUsers = async () => {
    try {
        let data = await userModel.find({})
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.addUser = async (newUser) => {
    try {
        let user = new userModel(newUser)
        let data = await user.save();
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.updateUser = async (id, user) => {
    try {
        let data = await userModel.updateOne({ _id: id }, user)
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.getUser = async (username, password ) => {
    try {
        let data = await userModel.findOne({ username, password })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.deleteUser = async (id) => {
    try {
        let data = await userModel.deleteOne({ _id: id })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

