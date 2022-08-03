const { userModel } = require("../db/models/userModel")
const bcrypt = require('bcrypt');

exports.register = async (user) => {
    try {
        let data = await userModel.findOne({ $or: [{ email: user.email }, { username: user.username }] })
        if (data) return { success: false, error: true, status: 400 };
        return exports.addUser(user)
    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }
}

exports.login = async (username, password) => {
    try {
        let data = await userModel.findOne({ username })
        if (!data) return { success: false, error: true, status: 401 };

        let comparePass = await bcrypt.compare(password, data.password);
        if (!comparePass) return { success: false, error: true, status: 401 };

        return data;
    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }
}

exports.changePassword = async (username, password, newPassword) => {
    try {
        let data = await userModel.findOne({ username, password });
        if (!data) return { success: false, error: true, status: 401 };
        data.password = newPassword;
        return exports.updateUser(data._id, data);
    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }
}

exports.getAllUsers = async (filter = {}) => {
    try {
        let data = await userModel.find(filter)
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
exports.addFavoriteCourse = async (id, courseId) => {
    try {
        let data = await userModel.updateOne({ _id: id }, { $addToSet: { 'favorite': courseId } })
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
exports.updateUser = async (id, user) => {
    try {
        let data = await userModel.updateOne({ _id: id }, user)
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
exports.getUser = async (username, password) => {
    try {
        let data = await userModel.findOne({ username, password })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

exports.getUserFavorite = async (id) => {
    try {
        let data = await userModel.findOne({ _id: id }).populate('favorite')
        return { success: true, data: data.favorite };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.getUserById = async (id) => {
    try {
        let data = await userModel.findById(id)
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

