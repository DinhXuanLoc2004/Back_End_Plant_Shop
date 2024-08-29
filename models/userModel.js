const mongoose = require('mongoose')
//tao model
const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String },
    avatar: { type: String },
    status: { type: String, default: 'active', enum: ['active', 'inactive', 'deleted'] },
    role: { type: Number, default: 1 }, // 1: user, 2: admin
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null },
    bills: {
        type: [{
            products: {type: [{}], required: false, default: [{}]},
            total: { type: Number, required: false },
            create_at: { type: Date, required: false },
            shipping_methord: { type: String, required: false},
            payment_methord: {type: String, required: false},
            name_order: {type: String, required: false},
            email_order: {type: String, required: false},
            address_order: {type: String, required: false},
            phone_order: {type: String, required: false},
            status: {type: String, default: 'pending', enum: ['pending', 'success', 'reject']}
        }], default: []
    }
})
// conllection: tieng anh, viet thuong va so it
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);