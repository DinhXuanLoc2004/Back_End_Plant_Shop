const productModel = require("../models/productModel");
const unidecode = require('unidecode')
const categoryModel = require('../models/categoryModel')

const listProduct = async () => {
    try {
        const products = await productModel.find({ isDelete: false });
        return products;
    } catch (error) {
        console.log('List Product error:', error);
        throw error;
    }
}

const listProductInCart = async (cart) => {
    let listProducts = []
    for (const item of cart) {
        try {
            const product = await productModel.findById(item.product_id)
            if (product) {
                listProducts.push({
                    ...product.toObject(),
                    quantity: item.quantity,
                    add_at: item.add_at,
                    updateQuantity_at: item.updateQuantity_at,
                    delete_at: item.delete_at,
                })
            }
        } catch (error) {
            console.log('List Product In Cart error:', error);
            throw error;
        }
    };
    // console.log('listProducts:',listProducts);
    return listProducts
}

const DetailById = async (_id) => {
    try {
        let DetailProduct = await productModel.findOne({ _id })
        return DetailProduct
    } catch (error) {
        console.log('Detail product by ID: ', error);
        throw error
    }
}

const addProduct = async (image, name, price, size, origin, inventory) => {
    try {
        if (!name || !price || !image || !size || !origin || !inventory) {
            throw new Error('Vui lòng điền đầy đủ thông tin!')
        } else {
            product = new productModel({ image ,name, price,  size, origin, inventory });
            const result = product.save();
            return result;
        }
    } catch (error) {
        console.log('Product error:', error)
        throw error;
    }
}

const updateProduct = async (_id, image, name, price, size, origin, inventory) => {
    try {
        let productDb = await productModel.findOne({ _id })
        if (!productDb) {
            throw new Error('Sản phẩm khum tồn tại!')
        } else {
            // Cập nhật thông tin sản phẩm
            productDb.image = image;
            productDb.name = name;
            productDb.price = price;
            productDb.size = size;
            productDb.origin = origin;
            productDb.inventory = inventory;
            productDb.update_at = Date.now();
            // Lưu lại thông tin cập nhật vào cơ sở dữ liệu
            return await productDb.save();
        }
    } catch (error) {
        console.log('Update error:', error);
        throw error;
    }
}

const deleteProductByID = async (_id) => {
    try {
        let deletedProduct = await productModel.findOne({ _id });
        console.log('deletedProduct',deletedProduct);
        if (!deletedProduct) {
            throw new Error('Sản phẩm không tồn tại!');
        } else {
            deletedProduct.isDelete = true
            deletedProduct.deleted_at = Date.now()
            return deletedProduct.save()
        }
    } catch (error) {
        console.log('Delete product error:', error);
        throw error;
    }
}


const search = async (name) => {
    try {
        const nameThuong = new RegExp(name, "i")
        // console.log(typeof(nameThuong));
        const products = await productModel.find({ name: nameThuong })
        if (products) {
            return products
        } else {
            throw new Error('Không có sản phẩm')
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { addProduct, listProduct, deleteProductByID, updateProduct, DetailById, listProductInCart, search };