const Product = require('../model/product.model');

class ProductService {
    async findProduct(body) {
        return await Product.findOne(body);
    }

    // async getAllProducts(query) {
    //     const { page = 1, limit = 10, sort = 'price', search } = query;
    //     const filter = search ? { title: { $regex: search, $options: 'i' }, isDelete: false } : { isDelete: false };
    //     const products = await Product.find(filter)
    //         .sort(sort)
    //         .skip((page - 1) * limit)
    //         .limit(limit);
    //     const total = await Product.countDocuments(filter);
    //     return { products, total };
    // }

    async addProduct(body) {
        const product = await Product.create(body);
        return product.save();
    }

    async updateProduct(productId, body) {
        return await Product.findByIdAndUpdate(productId, { $set: body }, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndUpdate(productId, { isDelete: true }, { new: true });
    }
}

module.exports = ProductService;