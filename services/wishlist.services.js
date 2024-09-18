const Favorites = require('../model/wishlist.model');
module.exports = class FavoriteServices{
    
    async addToFavorite(body) {
        try {
            return await Favorites.create(body);
        } catch (error) {
            console.log(error);
            return error.message; 
        }
    };
    
    async getAllFavorite(body) {
        try {
            let result = await Favorites.find(body).populate('product');
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async getFavorite(body) {
        try {
            return await Favorites.findOne(body).populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async getFavoriteById(id) {
        try {
            return await Favorites.findById(id).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async updateFavorite(id, body) {
        try {
            return await Favorites.findByIdAndUpdate(id, { $set: body}, { new: true });
        } catch (error) {
            console.log(error);
            return error.message;
        }
    } 
}