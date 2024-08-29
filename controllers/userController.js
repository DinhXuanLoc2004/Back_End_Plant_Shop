// var express = require('express')
// var userController = express.Router()
const { sendEmail } = require('../helper/emailer')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const register = async (email, password, role) => {
    try {
        // check email user
        let user = await userModel.findOne({ email })
        if (user) {
            throw new Error('Email da ton tai')
            return false
        } else {
            password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            user = new userModel({ email, password, role })
            // gui email khi dangky thanh cong
            // setTimeout(async () => {
            //     const dataEmail = {
            //         email: email,
            //         subject: 'dang ky thanh cong'
            //     }
            //     await sendEmail(dataEmail)
            // }, 0)
            // them user vao database
            return await user.save()
        }
    } catch (error) {
        console.log('Register error: ', error);
    }
}

const registerUser = async (name, email, password, phone) => {
    try {
        // check email user
        let user = await userModel.findOne({ email })
        if (user) {
            throw new Error('Email da ton tai')
            return false
        } else {
            password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            user = new userModel({ email, password, phone, name })
            // gui email khi dangky thanh cong
            setTimeout(async () => {
                const dataEmail = {
                    email: email,
                    subject: 'dang ky thanh cong'
                }
                await sendEmail(dataEmail)
            }, 0)
            // them user vao database
            return await user.save()
        }
    } catch (error) {
        console.log('Register error: ', error);
    }
}

const login = async (email, password) => {
    try {
        // Check if email is already in use
        // select * from users where email = email (SQL)
        let user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('Email is not exist');
        } else {
            // so sánh password
            const checkPassWord = await bcrypt.compareSync(password, user.password)
            if (checkPassWord) {
                const { password: _, ...userLogin } = user._doc
                return userLogin
            } else {
                throw new Error('Password is not correct');
            }
        }
    } catch (error) {
        console.log('Error: ', error);
        throw new Error('Error when login user')
    }
    return null;
}

const loginAdmin = async (email, password) => {
    try {
        // Check if email is already in use
        // select * from users where email = email (SQL)
        let user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('Email is not exist');
        } else {
            const role = user.role
            if (role === 2) {
                // so sánh password
                const checkPassWord = await bcrypt.compareSync(password, user.password)
                if (checkPassWord) {
                    const { password: _, ...userLogin } = user._doc
                    return userLogin
                } else {
                    throw new Error('Password is not correct');
                }
            } else {
                throw new Error('Email không đúng quyền admin');
            }
        }
    } catch (error) {
        console.log('Error: ', error);
        throw new Error('Error when login user')
    }
    return null;
}

const upadteUser = async (id, name, password, role, active) => {
    try {
        let userinDb = await userModel.findById(id);
        if (!userinDb) {
            throw new Error('Người dùng không tồn tại!');
        }
        userinDb.name = name;
        userinDb.password = password;
        userinDb.role = role;
        userinDb.active = active;
        userinDb.upadteAt = Date.now

        return await userinDb.save();
        // return true;
    } catch (error) {
        console.log('Update error:', error);
        throw error;
    }
}

const addBill = async (_id, bill) => {
    console.log('id:', _id, 'bill', bill);
    try {
        let userCart = await userModel.findOne({ _id })
        console.log(userCart);
        if (userCart) {
            userCart.bills.push(bill)
            return await userCart.save()
        } else {
            throw new Error('Không tìm thấy người dùng')
        }
    } catch (error) {
        console.log(error);
    }
}

const getBillByUser = async (_id) => {
    try {
        let userCart = await userModel.findOne({ _id })
        if (userCart) {
            return userCart.bills
        } else {
            throw new Error('Không tìm thấy người dùng')
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteProductCart = async (product_id) => {
    try {
        let productDelete = await userModel.findOneAndUpdate(
            { 'cart.product_id': product_id },
            { $pull: { cart: { product_id: product_id } } },
            { new: true }
        );
        console.log(productDelete);
        if (productDelete) {
            return productDelete
        } else {
            throw new Error('Sản phẩm không tồn tại trong giỏ hàng!');
        }
    } catch (error) {
        console.log('Delete product error:', error);
        throw error;
    }
}

module.exports = { register, login, upadteUser, addBill, deleteProductCart, registerUser, getBillByUser, loginAdmin }