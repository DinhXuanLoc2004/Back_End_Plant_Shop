const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    description: {type: String, require: true},
    isDelete: {type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
    update_at: {type: Date, default: null},
    deleted_at: { type: Date, default: null }
})

module.exports = mongoose.model('category', CategorySchema)