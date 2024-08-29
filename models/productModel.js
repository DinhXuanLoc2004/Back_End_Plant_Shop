const { mongoose, Schema } = require("mongoose");

//Khai bao schema cua product
const ProductSchema = new Schema ({
    name: {type: String, require: true},
    image: {type: [String], require: true},
    price: {type: Number, require: true},
    catagory: { type: Schema.ObjectId, ref: 'Categories'},
    listTypes: {type: [String], require: false},
    size: {type : String, require: true},
    origin: {type: String, require: true},
    inventory: {type: Number, require: true},
    isDelete: {type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})
//tieng anh, viet thuong, dung so it
module.exports = mongoose.models.product || mongoose.model('product', ProductSchema);