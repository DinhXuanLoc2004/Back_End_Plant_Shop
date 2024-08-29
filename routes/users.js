var express = require('express');
const { register, login, upadteUser, addCart, deleteProductCart, registerUser, addBill, getBillByUser, loginAdmin } = require('../controllers/userController');
const userModel = require('../models/userModel');
// const userController = require('../controllers/userController')
var users = express.Router();

users.post('/register', async (req, res, next) => {
  try {
    // 1.lay thong tin tu client
    const { name, email, password, phone } = req.body
    // 2.chuyen cho controller giai quyet
    // 3.nhan phan hoi tu controller
    const result = await registerUser(name, email, password, phone)
    console.log('...result: ', result);
    // 4.phan hoi lai cho client
    if (result) {
      return res.status(200).json({ status: true, result: result })
    } else {
      return res.status(400).json({ message: 'Register Failed!' })
    }

  } catch (error) {
    return res.status(500).json(error)
  }
})

users.post('/registerAdmin', async (req, res, next) => {
  try {
    // 1.lay thong tin tu client
    const { email, password } = req.body
    const role = 2
    // 2.chuyen cho controller giai quyet
    // 3.nhan phan hoi tu controller
    const result = await register(email, password, role)
    console.log('...result: ', result);
    // 4.phan hoi lai cho client
    if (result) {
      return res.status(200).json({ status: true, result: result })
    } else {
      return res.status(400).json({ message: 'Register Failed!' })
    }

  } catch (error) {
    return res.status(500).json(error)
  }
})

users.put('/:id/updateUser', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, role, active } = req.body;
    const result = await upadteUser(id, name, password, role, active);
    if (result) {
      return res.status(200).json({ message: 'Cập nhật thông tin thành công' })
    } else {
      throw new Error('Update fail!')
    }
  } catch (error) {
    console.log('Update error:', error);
    return res.status(500).json({ message: error.message });
  }
})

users.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let result = await login(email, password);
    return res.status(200).json({ status: true, data: result });
  } catch (error) {
    return res.status(500).json({ status: false, data: error.message });
  }
});

users.post('/loginAdmin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let result = await loginAdmin(email, password);
    return res.status(200).json({ status: true, data: result });
  } catch (error) {
    return res.status(500).json({ status: false, data: error.message });
  }
});

users.post('/addBill/:_id', async (req, res, next) => {
  const { _id } = req.params
  const { products, total, shipping_methord, payment_methord, name_order, email_order, address_order, phone_order } = req.body
  const bill = {
    products: products,
    total: total,
    create_at: Date.now(),
    shipping_methord: shipping_methord,
    payment_methord: payment_methord,
    name_order: name_order,
    email_order: email_order,
    address_order: address_order,
    phone_order: phone_order
  }
  try {
    const result = await addBill(_id, bill)
    console.log('result:', result);
    if (result) {
      return res.status(200).json({
        message: 'Thêm sản phẩm vào đơn hàng thành công',
        status: true,
        result: result
      })
    } else {
      throw new Error('Add to bill failed!')
    }
  } catch (error) {
    console.log('Add to bill error:', error);
    return res.status(500).json({ message: error.message });
  }
})

users.post('/getBillsByUser/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params
    const result = await getBillByUser(_id)
    if (result) {
      return res.status(200).json({
        message: 'Xem giỏ hàng thành công',
        status: true,
        result: result
      })
    } else {
      throw new Error('Get to bill failed!')
    }
  } catch (error) {
    console.log('Get to bill error:', error);
    return res.status(500).json({ message: error.message });
  }
})

users.delete('/DeleteProductCart/:product_id', async (req, res, next) => {
  try {
    const { product_id: product_id } = req.params
    let result = await deleteProductCart(product_id)
    console.log(result);
    if (result) {
      return res.status(200).json({ status: true, result: result })
    } else {
      return res.status(400).json({ message: 'Không có sản phẩm' })
    }
  } catch (error) {
    console.log('error:', error);
    return res.status(500).json({ message: error.message });
  }
})

users.get('/getAllBills', async (req, res, next) => {
  try {
    const users = await userModel.find({}, 'bills')
    let allBills = []
    users.forEach(user => {
      if (user.bills && user.bills.length > 0) {
        allBills = allBills.concat(user.bills);
      }
    })
    return await res.status(200).json({status: true, allBills: allBills})
  } catch (error) {
    return await res.status(200).json({ error: error})
  }
})

module.exports = users