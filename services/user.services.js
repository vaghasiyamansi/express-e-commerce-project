const User = require("../model/user.model");
class UserServices{
    async user(body){
        return await User.findOne(body);
    }
    async update(userId, body){
        return await User.findByIdAndUpdate(userId, {$set: body}, {new: true});
    }
    async delete(userId, body){
        return await User.findByIdAndUpdate(userId,body ,{new: true});
    }
}
module.exports = UserServices;