const categoryModel = require("../models/categoryModel");

const listCategory = async () => {
    try {
        const categorys = await categoryModel.find({});
        return categorys;
    } catch (error) {
        console.log('List Category error:', error);
        throw error;
    }
}

const addCategory = async (name, description) => {
    let category = await categoryModel.findOne({ name: name });
    try {
        if (!name || !description) {
            throw new Error('Vui lòng điền đầy đủ thông tin!')
        } else {
            category = new categoryModel({
                name: name,
                description: description,
            });
            const result = category.save();
            return result;
        }
    } catch (error) {
        console.log('Category error:', error)
        throw error;
    }
}

const updateCategory = async (id, name, description) => {
    try {
        const categoryinDb = await categoryModel.findById(id);
        if (!categoryinDb) {
            throw new Error('Sản phẩm không tồn tại!');
        }
        categoryinDb.name = name || categoryinDb.name;
        categoryinDb.description = description || categoryinDb.description;
        categoryinDb.updateAt = Date.now()

        await categoryinDb.save();
        return true;
    } catch (error) {
        console.log('Update error:', error);
        throw error;
    }
}

const deleteCategoryByID = async (_id) => {
    try {
        const deletedCategory = await categoryModel.findOneAndDelete({ _id: _id });
        if (!deletedCategory) {
            throw new Error('Sản phẩm không tồn tại!');
        } else {
            throw new Error('Xóa sản phẩm thành công');
        }
    } catch (error) {
        console.log('Delete category error:', error);
        throw error;
    }
}

module.exports = { listCategory, addCategory, updateCategory, deleteCategoryByID};